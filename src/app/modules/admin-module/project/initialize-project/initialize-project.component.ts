import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Project } from '../project.model';
import { formatDate } from '@angular/common';
import { ProjectService } from '../project.service';


@Component({
  templateUrl: './initialize-project.component.html',
  styleUrls: ['./initialize-project.component.css']
})

export class InitializeProjectComponent implements OnInit {
  departments: string[];
  initializeProjectForm: FormGroup;
  private departmentSub: Subscription;

  constructor(public authService: AuthService, public projectService: ProjectService) {}

  isFieldValid(field: string) {
    if (!this.initializeProjectForm.get(field).valid === true && this.initializeProjectForm.get(field).touched === true) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.initializeProjectForm = new FormGroup({
      project_id: new FormControl(null, {
        validators: [Validators.required]
      }),
      project_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      client: new FormControl(null, {
        validators: [Validators.required]
      }),
      initial_department_id: new FormControl(null)
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

  onInitializeProject() {
    const project: Project = {
      project_id: this.initializeProjectForm.value.project_id,
      project_name: this.initializeProjectForm.value.project_name,
      client: this.initializeProjectForm.value.client,
      initial_department_id: this.initializeProjectForm.value.initial_department_id,
      start_date: null,
      status: 'Pending',
      current_department: null,
      currently_assigned_user: null
    };
    this.projectService.initializeProject(project);
  }

}
