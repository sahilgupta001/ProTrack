import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { AuthData } from '../../../auth/auth-data.model';
import { Subscription } from 'rxjs';

@Component ({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {
  departments: string[];
  emailUnique = true;
  signupForm: FormGroup;
  private departmentSub: Subscription;
  constructor(public authService: AuthService) {}

  isFieldValid(field: string) {
    if (!this.signupForm.get(field).valid === true && this.signupForm.get(field).touched === true) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
      this.signupForm = new FormGroup({
        email: new FormControl(null, {
          validators: [Validators.email, Validators.required]
        }),
        password: new FormControl(null, {
          validators: [Validators.required]
        }),

        phone_no: new FormControl(null, {
          validators: [Validators.required]
        }),
        fname: new FormControl(null, {
          validators: [Validators.required]
        }),
        lname: new FormControl(null, {
          validators: [Validators.required]
        }),
        department_id: new FormControl(null, {
          validators: [Validators.required]
        })
      });
      this.setDepartmentList();
    }

  setDepartmentList() {
    this.authService.getDepartments();
    this.departmentSub = this.authService.getDepartmentUpdateListener()
      .subscribe((departmentData: {departments: []}) => {
        this.departments = departmentData.departments;
      });
  }
  onSignup() {
    console.log(this.signupForm.value.department_id);
    const createUser: AuthData = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      phone_no: this.signupForm.value.phone_no,
      lname: this.signupForm.value.lname,
      fname: this.signupForm.value.fname,
      department_id: this.signupForm.value.department_id,
    };
    this.authService.checkMailUnique(this.signupForm.value.email)
      .subscribe(result => {
        if (result.flag === false) {
          this.emailUnique = false;
        } else {
          this.authService.signup(createUser);
          this.signupForm.reset();
        }
      });
    }
}
