import { Component, Input, OnInit } from '@angular/core';
import { Defect } from 'src/app/shared/models/defect-model';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../department/department.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DefectService } from 'src/app/shared/services/defect.service';

@Component({
  selector: 'app-delete-defects',
  templateUrl: './delete-defects.component.html'
})

export class DeleteDefectsComponent implements OnInit {
  @Input() projectId;
  defects: Defect;
  users: any;
  departmentId: string;
  userId: number;
  departments: string[];
  private departmentSub: Subscription;
  private defectSub: Subscription;

  constructor(public departmentService: DepartmentService, public authService: AuthService, public defectService: DefectService) {}
  ngOnInit() {
    this.setDefectData();
    this.setDepartmentList();
  }

  assignStatus(status: number) {
    if (status === 1) {
      return true;
    } else {
      return false;
    }
  }

  setDefectData() {
    this.defectService.getDefectData(this.projectId);
    this.defectSub = this.defectService.getDefectUpdateListener()
      .subscribe((defectData: {defects: Defect}) => {
        this.defects = defectData.defects;
      });
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

  onDelete(defectId: number) {
      this.defectService.deleteDefect(this.projectId, defectId)
        .subscribe(response => {
          console.log(response);
        });
      this.setDefectData();
    }

}
