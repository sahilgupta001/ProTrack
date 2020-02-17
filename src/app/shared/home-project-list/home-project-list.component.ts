import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../modules/admin-module/project/project.service';
import { Project } from '../../modules/admin-module/project/project.model';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/modules/admin-module/department/department.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    templateUrl: './home-project-list.component.html',
    styleUrls: ['./home-project-list.component.css']
})

export class HomeProjectListComponent implements OnInit {
    projects: Project;
    private userProjectsSub = new Subscription();
    roleId: string;
    userId: string;
    isManagerFlag = false;
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

    constructor(private projectService: ProjectService, private authService: AuthService, private departmentService: DepartmentService) {}

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.checkUser();
        if (this.isManagerFlag === true) {
          this.projectService.findManagerProjects(this.userId);
          this.userProjectsSub = this.projectService.getManagerProjectsUpdatedListener()
              .subscribe((projectData: { projects: Project }) => {
                  this.projects = projectData.projects;
              });
        } else {
          this.projectService.findUserProjects(this.userId);
          this.userProjectsSub = this.projectService.getProjectsUpdatedListener()
              .subscribe((projectData: { projects: Project }) => {
                  this.projects = projectData.projects;
              });
        }
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

    checkUser() {
      const roleId = localStorage.getItem('roleId');
      if (roleId === 'PU_MNG_104' || roleId === 'PVG_MNG_104') {
        this.isManagerFlag = true;
      }
    }

    onAssign(projectId: string, currentDepartment: string) {
      this.projectService.assignProject(projectId, this.selectedStatus, this.selectedDepartment, this.selectedManager, currentDepartment);
    }
}
