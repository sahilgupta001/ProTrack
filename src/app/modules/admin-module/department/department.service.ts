import { Injectable } from '@angular/core';
import { Department } from './department.model';
import { HttpClient } from '@angular/common/http';
import { Roles } from './roles.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn : 'root'
})


export class DepartmentService {
  private userData: any;
  private roles: any;
  private userDataUpdated = new Subject<{ userData: any, roles: any }>();
  private ProjectUserDataUpdated = new Subject<{ data: any }>();
  private AssignedUserDataUpdated = new Subject<{ data: any }>();

  constructor(private http: HttpClient) {}

  createDepartment(department: Department) {
    this.http.post(BACKEND_URL + '/dept/', department)
      .subscribe(response => {
        console.log(response);
      });
  }

  createRole(role: Roles) {
    this.http.post(BACKEND_URL + '/dept/createRole', role)
      .subscribe(response => {
        console.log(response);
      });
  }

  getManagers(departmentId: string) {
    return this.http.get<{message: string, data: any}>(BACKEND_URL + '/dept/getManagers/' + departmentId);
  }

  getUsers(departmentId: string) {
    return this.http.get<{message: string, data: any}>(BACKEND_URL + '/dept/getUsers/' + departmentId);
  }

  getUserData(departmentId: string) {
    this.http.get<{ message: string, userData: any, rolesData: any}>(BACKEND_URL + '/dept/' + departmentId)
      .subscribe(fetchedData => {
        this.userData = fetchedData.userData;
        this.roles = fetchedData.rolesData;
        this.userDataUpdated.next({
          userData: [...this.userData],
          roles: [...this.roles]
        });
      });
  }

  getProjectUserData(projectId: string, departmentId: string) {
    // tslint:disable-next-line: max-line-length
    this.http.get<{ message: string, data: any}>(BACKEND_URL + '/project/projectUserData/' + departmentId + '/' + projectId)
      .subscribe(fetchedData => {
        this.userData = [];
        this.userData = fetchedData.data;
        this.ProjectUserDataUpdated.next({
          data: [...this.userData]
        });
      });
  }


  assignRole(selectedRole: string, userId: string, department: string) {
    const data = {
      role: selectedRole,
      // tslint:disable-next-line:object-literal-shorthand
      userId: userId,
      // tslint:disable-next-line:object-literal-shorthand
      department: department
    };
    this.http.post(BACKEND_URL + '/dept/assignRole', data)
      .subscribe(response => {
        console.log(response);
      });
  }

  getAssignedUserData(projectId: string, deptId: string) {
    // tslint:disable-next-line: max-line-length
    this.http.get<{ message: string, data: any}>(BACKEND_URL + '/project/AssignedUserData/' + deptId + '/' + projectId)
    .subscribe(fetchedData => {
      this.userData = [];
      this.userData = fetchedData.data;
      this.AssignedUserDataUpdated.next({
        data: [...this.userData]
      });
    });
  }

  userDataUpdateListener() {
    return this.userDataUpdated.asObservable();
  }

  ProjectUserDataUpdateListener() {
    return this.ProjectUserDataUpdated.asObservable();
  }

  AssignedUserDataUpdateListener() {
    return this.AssignedUserDataUpdated.asObservable();
  }

}




