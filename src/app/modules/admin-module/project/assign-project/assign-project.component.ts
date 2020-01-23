import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../../department/department.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.css']
})

export class AssignProjectComponent implements OnInit {
  projectData: Project;
  managerData: any;
  selectedDepartment: string;
  selectedManager: string;
  selectedStatus: string;
  displayError = false;
  departments: string[];
  statuses = [
    'Pending',
    'Initiated',
    'Final'
  ];
  private departmentSub: Subscription;

  constructor(public authService: AuthService, public projectService: ProjectService, public departmentService: DepartmentService) {}

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

  setManagerList() {
    this.departmentService.getManagers(this.selectedDepartment)
      .subscribe(response => {
        this.managerData = [];
        this.managerData = response.data;
      });
  }

  onSearch(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.projectService.findProjects(form.value.department)
      .subscribe(data => {
        if (data.length === 0) {
          this.displayError = true;
        } else {
          this.projectData = data.projects;
        }
      });
  }

  selectDepartment(selectedDepartment: string) {
    this.selectedDepartment = selectedDepartment;
    this.setManagerList();
  }

  selectManager(selectedManager: string) {
    this.selectedManager = selectedManager;
  }

  selectStatus(selectedStatus: string) {
    this.selectedStatus =  selectedStatus;
  }

  onAssign(projectId: string, currentDepartment: string) {
    this.projectService.assignProject(projectId, this.selectedStatus, this.selectedDepartment, this.selectedManager, currentDepartment);
  }

}
