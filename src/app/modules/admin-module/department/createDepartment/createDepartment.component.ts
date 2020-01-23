import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from '../department.model';
import { DepartmentService } from '../department.service';
@Component({
  templateUrl: 'createDepartment.component.html',
  styleUrls: ['createDepartment.component.css']
})

export class CreateDepartmentComponent implements OnInit {

  createDeptForm: FormGroup;

  constructor(public departmentService: DepartmentService ) {}

  isFieldValid(field: string) {
    if (!this.createDeptForm.get(field).valid === true && this.createDeptForm.get(field).touched === true) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {

    this.createDeptForm = new FormGroup ({
      department_id: new FormControl(null, {
        validators: [Validators.required]
      }),
      department_name: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onCreateDept() {
    const department: Department = {
      department_id: this.createDeptForm.value.department_id,
      department_name: this.createDeptForm.value.department_name
    };
    this.departmentService.createDepartment(department);
    this.createDeptForm.reset();
  }
}
