import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DepartmentService } from 'src/app/modules/admin-module/department/department.service';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/modules/admin-module/project/project.service';

@Component({
  selector: 'app-project-assign',
  templateUrl: './project-assign.component.html'
})

export class ProjectAssignComponent implements OnInit {
  @Input() projectId;
  departments: string[];
  roleId: string[];
  selectedDepartment: string;
  userData: any;
  users: any;
  userId: string;
  selectedRole: string;
  private departmentSub: Subscription;
  private userDataSub: Subscription;

  constructor(public projectService: ProjectService, public departmentService: DepartmentService) {}

  ngOnInit() {
    this.setUserList();
    this.setAssignedUsers();
  }

  setUserList() {
    this.roleId = localStorage.getItem('roleId').split('_');
    if (this.roleId[0] === 'PU') {
      this.selectedDepartment = 'PU_102';
    } else {
      this.selectedDepartment = 'PVG_101';
    }
    this.departmentService.getProjectUserData(this.projectId, this.selectedDepartment);
    this.departmentSub = this.departmentService.ProjectUserDataUpdateListener()
      .subscribe((data) => {
        this.userData = data.data;
      });
  }

  setAssignedUsers() {
    this.roleId = localStorage.getItem('roleId').split('_');
    if (this.roleId[0] === 'PU') {
      this.selectedDepartment = 'PU_102';
    } else {
      this.selectedDepartment = 'PVG_101';
    }
    this.departmentService.getAssignedUserData(this.projectId, this.selectedDepartment);
    this.departmentSub = this.departmentService.AssignedUserDataUpdateListener()
      .subscribe((data) => {
        this.users = data.data;
      });
  }

  onAssign(userId: number) {
    this.projectService.assignUser(this.projectId, userId);
    this.setUserList();
    this.setAssignedUsers();
  }
}
