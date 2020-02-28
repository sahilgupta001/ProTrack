import { Component, OnInit, Input } from '@angular/core';
import { DefectService } from '../../services/defect.service';
import { Defect } from '../../models/defect-model';

@Component({
  selector: 'app-close-defects',
  templateUrl: './close-defects.component.html'
})


export class CloseDefectsComponent implements OnInit {
  @Input() projectId;
  defects: Defect;
  userId: string;
  constructor(private defectService: DefectService) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getDefects();
  }

  getDefects() {
    this.defectService.getUserDefects(this.projectId, this.userId)
    .subscribe(response => {
      this.defects = response.defects;
    });
  }

  closeStatus(status: string) {
    if (status === 'closed') {
      return true;
    } else {
      return false;
    }
  }

  onDefectClose(defectId: number) {
    this.defectService.closeDefect(this.projectId, defectId)
      .subscribe(response => {
        console.log(response);
      });
    this.getDefects();
  }
}
