import { Component, Input, OnInit } from '@angular/core';
import { DefectService } from '../../services/defect.service';
import { Defect } from '../../models/defect-model';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/modules/admin-module/department/department.service';

@Component({
  templateUrl: './defect-summary.component.html',
  selector: 'app-defect-summary',
  styleUrls: ['./defect-summary.component.css']
})

export class DefectSummaryComponent implements OnInit {
  @Input() projectId: string;
  defects: Defect;
  users: any;
  departmentId: string;
  userId: number;
  departments: string[];
  private departmentSub: Subscription;

  constructor(public departmentService: DepartmentService, public authService: AuthService, public defectService: DefectService) {}

  ngOnInit() {
    this.defectService.getDefectData(this.projectId)
      .subscribe(response => {
        console.log(response.message);
        this.defects = response.defects;
      });
    this.setDepartmentList();
}

assignStatus(status: number) {
  if (status === 1) {
    return true;
  } else {
    return false;
  }
}

setDepartmentList() {
  this.authService.getDepartments();
  this.departmentSub = this.authService.getDepartmentUpdateListener()
    .subscribe((departmentData: {departments: []}) => {
      this.departments = departmentData.departments;
    });
}

setUserList(departmentId: string) {
  this.departmentId = departmentId;
  this.departmentService.getUsers(departmentId)
    .subscribe(users => {
      this.users = users.data;
    });
}

setUser(userId: number) {
  this.userId = userId;
}

onAssign(defectId: number) {
    this.defectService.assignDefect(this.projectId, defectId, this.departmentId, this.userId)
      .subscribe(response => {
        console.log(response);
      });
  }
}
