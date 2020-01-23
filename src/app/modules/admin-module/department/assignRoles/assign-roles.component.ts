import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DepartmentService } from '../department.service';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.css']
})

export class AssignRolesComponent implements OnInit {
  departments: string[];
  selectedDepartment: string;
  userData: any;
  userId: string;
  roles: any;
  selectedRole: string;
  private departmentSub: Subscription;
  private userDataSub: Subscription;

  constructor(public authService: AuthService, public departmentService: DepartmentService) {}

  ngOnInit() {
    this.setDepartmentList();
  }

  setDepartmentList() {
    this.authService.getDepartments();
    this.departmentSub = this.authService.getDepartmentUpdateListener()
      .subscribe((departmentData: {departments: []}) => {
        this.departments = departmentData.departments;
      });
  }

  onSearch(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.selectedDepartment = form.value.department;
    this.departmentService.getUserData(form.value.department);
    this.departmentSub = this.departmentService.userDataUpdateListener()
      .subscribe((data) => {
        // console.log(data.userData);
        this.userData = data.userData;
        this.roles = data.roles;
      });
  }

  selectRole(role: string, userId: string) {
    this.selectedRole = role;
    this.userId = userId;
  }

  onAssign() {

    this.departmentService.assignRole(this.selectedRole, this.userId, this.selectedDepartment);
  }

}
