import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenTimer: any;
  private token: string;
  public isAuthenticated = false;
  private isAdmin = false;
  private userId: number;
  public roleId: string;
  private departments: any;
  private authStatusListener = new Subject<boolean>();
  private roleStatusListener = new Subject<boolean>();
  private departmentsUpdated = new Subject<{ departments: string[] }>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getIsAdmin() {
    return this.isAdmin;
  }

  getRoleStatusListener() {
    return this.roleStatusListener.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(email: string, password: string) {
    // tslint:disable-next-line:object-literal-shorthand
    const authData: AuthData = { email: email, password: password, phone_no: null, lname: null, fname: null, department_id: null };
    this.http.post<{ token: string, message: string, user_id: number, role_id: string, expiresIn: number }>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.user_id;
          this.roleId = response.role_id;
          if( this.roleId === 'admin_01') {
            this.roleStatusListener.next(true);
            this.isAdmin = true;  
          }
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId, this.roleId);
        }
        console.log(response.message);
        this.router.navigate(['/home']);
      }, error => {
        this.authStatusListener.next(false);
        this.roleStatusListener.next(false);
      });
  }

  getDepartments() {
    this.http.get<{ message: string, department: any }>('http://localhost:3000/api/user/getDepartments')
      .subscribe(fetchedDepartments => {
        this.departments = fetchedDepartments.department;
        this.departmentsUpdated.next({
          departments: [...this.departments]
        });
      });
  }

  getDepartmentUpdateListener() {
    return this.departmentsUpdated.asObservable();
  }

  signup(createUser: AuthData) {
    this.http.post('http://localhost:3000/api/user/signup', createUser)
      .subscribe(createdUser => {
        console.log('The user is successfully created');
        console.log(createdUser);
      });
  }

  setAuthTimer( duration: number ) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      if (authInformation.roleId === 'admin_01')  
      this.isAdmin = true;
      }
      this.roleStatusListener.next(true);
      this.authStatusListener.next(true);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const roleId = localStorage.getItem('roleId');
    if (!token && !expirationDate) {
      return;
    }
    return {
      // tslint:disable-next-line:object-literal-shorthand
      token: token,
      expirationDate: new Date(expirationDate),
      roleId: roleId
    };
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.authStatusListener.next(false);
    this.userId = null;
    this.roleStatusListener.next(false);
    this.roleId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: number, roleId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('roleId', roleId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
  }

  checkMailUnique(email: string) {
    const emailFetched = {
      emailId: email
    };
    return this.http.put<{ message: string, flag: boolean }>('http://localhost:3000/api/user/validateEmail', emailFetched);
  }

}
