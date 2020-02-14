import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from 'src/app/modules/admin-module/project/project.service';
import { Project } from 'src/app/modules/admin-module/project/project.model';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})

export class ProjectDetailComponent implements OnInit {
  project: Project;
  projectId: string;
  roleId: string;
  iterationData: any;
  iterationFlag = false;
  projectDetailFlag = true;
  documentUploadFlag = false;
  defectRaiseFlag = false;
  defectSummaryFlag = false;
  defectBulkRaiseFlag = false;
  viewDocumentsFlag = false;
  closeDefectsFlag = false;
  deleteDefectFlag = false;
  adminFlag = false;
  private projectDataUpdated = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) {}

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');
    this.route.paramMap.subscribe(paramMap => {
      this.projectId = paramMap.get('projectId');
    });
    // console.log(this.roleId);
    this.getProjectDetail(this.projectId);
    if ( this.roleId === 'admin_01') {
      this.adminFlag = true;
    }
  }

  getProjectDetail(projectId: string) {
    this.projectService.getProjectDetail(projectId);
    this.projectDataUpdated = this.projectService.getCurrentProjectDataUpdated()
      .subscribe((data: {project: Project, iterationData: any}) => {
        this.project = data.project;
        this.iterationData = data.iterationData;
      });
  }

  displayIterations() {
    this.deleteDefectFlag = false;
    this.closeDefectsFlag = false;
    this.viewDocumentsFlag = false;
    this.defectRaiseFlag = false;
    this.iterationFlag = true;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  displayDetails() {
    this.deleteDefectFlag = false;
    this.closeDefectsFlag = false;
    this.viewDocumentsFlag = false;
    this.defectRaiseFlag = false;
    this.projectDetailFlag = true;
    this.iterationFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  documentUpload() {
    this.deleteDefectFlag = false;
    this.closeDefectsFlag = false;
    this.viewDocumentsFlag = false;
    this.defectRaiseFlag = false;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = true;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  defectRaise() {
    this.deleteDefectFlag = false;
    this.closeDefectsFlag = false;
    this.viewDocumentsFlag = false;
    this.defectRaiseFlag = true;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  defectSummary() {
    this.deleteDefectFlag = false;
    this.closeDefectsFlag = false;
    this.viewDocumentsFlag = false;
    this.defectRaiseFlag = false;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = true;
    this.defectBulkRaiseFlag = false;
  }

  defectRaiseBulk() {
    this.deleteDefectFlag = false;
    this.closeDefectsFlag = false;
    this.viewDocumentsFlag = false;
    this.defectRaiseFlag = false;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = true;
  }

  viewDocuments() {
    this.deleteDefectFlag = false;
    this.closeDefectsFlag = false;
    this.viewDocumentsFlag = true;
    this.defectRaiseFlag = false;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  closeDefects() {
    this.deleteDefectFlag = false;
    this.closeDefectsFlag = true;
    this.viewDocumentsFlag = false;
    this.defectRaiseFlag = false;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  deleteDefects() {
    this.deleteDefectFlag = true;
    this.closeDefectsFlag = false;
    this.viewDocumentsFlag = false;
    this.defectRaiseFlag = false;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

}
