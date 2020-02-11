import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { DepartmentService } from 'src/app/modules/admin-module/department/department.service';
import { DefectService } from '../../services/defect.service';
import { Defect } from '../../models/defect-model';

@Component({
  selector: 'app-defect-raise',
  templateUrl: './defect-raise.component.html',
  styleUrls: ['./defect-raise.component.css']
})

export class DefectRaiseComponent implements OnInit {

  @Input() projectId: string;
  departments: string[];
  users: any;
  defectTypes: any;
  defectCategory: any;
  defectStatus: any;
  defectId: any;
  defectForm: FormGroup;
  private departmentSub: Subscription;

  constructor(public authService: AuthService,
              public departmentService: DepartmentService,
              public defectService: DefectService) {}

  ngOnInit() {
    this.defectForm = new FormGroup({
      defect_name: new FormControl(null, {
        validators: [Validators.required]
      }),
      category: new FormControl(null, {
        validators: [Validators.required]
      }),
      defect_type: new FormControl(null, {
        validators: [Validators.required]
      }),
      status: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      log_data: new FormControl(null, {
        validators: [Validators.required]
      }),
      assign_department: new FormControl(null),
      assign_to: new FormControl(null)
    });

    this.setDepartmentList();
    this.setDefectType();
    this.setDefectCategory();
    this.setDefectStatus();
  }

  setDepartmentList() {
    this.authService.getDepartments();
    this.departmentSub = this.authService.getDepartmentUpdateListener()
      .subscribe((departmentData: {departments: []}) => {
        this.departments = departmentData.departments;
      });
  }

  setUserList() {
    this.departmentService.getUsers(this.defectForm.value.assign_department)
      .subscribe(users => {
        this.users = users.data;
      });
  }

  setDefectType() {
    this.defectService.getDefectType()
      .subscribe(types => {
        this.defectTypes = types.data;
      });
  }

  setDefectCategory() {
    this.defectService.getDefectCategory()
      .subscribe(categories => {
        this.defectCategory = categories.data;
      });
  }

  setDefectStatus() {
    this.defectService.getDefectStatus()
      .subscribe(status => {
        this.defectStatus = status.data;
      });
  }

  onDefectRaise() {
    let assignStatus;
    if (this.defectForm.value.assign_to == null || this.defectForm.value.assign_department == null) {
      assignStatus = 0;
    } else {
      assignStatus = 1;
    }

    const data: Defect = {
      // tslint:disable-next-line: object-literal-key-quotes
      'defect_id': null,
      // tslint:disable-next-line: object-literal-key-quotes
      'defect_name': this.defectForm.value.defect_name,
      // tslint:disable-next-line: object-literal-key-quotes
      'defect_category': this.defectForm.value.category,
      // tslint:disable-next-line: object-literal-key-quotes
      'defect_type': this.defectForm.value.defect_type,
      // tslint:disable-next-line: object-literal-key-quotes
      'status': this.defectForm.value.status,
      // tslint:disable-next-line: object-literal-key-quotes
      'description': this.defectForm.value.description,
      // tslint:disable-next-line: object-literal-key-quotes
      'log_data': this.defectForm.value.log_data,
      // tslint:disable-next-line: object-literal-key-quotes
      'assign_department': this.defectForm.value.assign_department,
      // tslint:disable-next-line: object-literal-key-quotes
      'assign_to': this.defectForm.value.assign_to,
      // tslint:disable-next-line: object-literal-key-quotes
      'date': null,
      // tslint:disable-next-line: object-literal-key-quotes
      'assign_status': assignStatus
    };
    this.defectService.raiseDefect(data, this.projectId)
    .subscribe(response => {
      console.log(response);
      this.defectForm.reset();
    });
  }
}
