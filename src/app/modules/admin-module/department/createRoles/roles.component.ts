import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../department.service';
import { Roles } from '../roles.model';

@Component({
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {

  departments: string[];
  createRoleForm: FormGroup;
  private departmentSub: Subscription;

  constructor(private authService: AuthService, public departmentService: DepartmentService) {}

  isFieldValid(field: string) {
    if (!this.createRoleForm.get(field).valid === true && this.createRoleForm.get(field).touched === true) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.createRoleForm = new FormGroup ({
      department_id: new FormControl(null, {
        validators: [Validators.required]
      }),
      role_id: new FormControl(null, {
        validators: [Validators.required]
      }),
      role_name: new FormControl(null, {
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

  onCreateRole() {
    const role: Roles = {
      department_id: this.createRoleForm.value.department_id,
      role_id: this.createRoleForm.value.role_id,
      role_name: this.createRoleForm.value.role_name
    };

    this.departmentService.createRole(role);
    this.createRoleForm.reset();
  }
}
