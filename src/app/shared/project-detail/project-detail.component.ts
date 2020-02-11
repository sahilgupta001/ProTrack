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
  iterationData: any;
  iterationFlag = false;
  projectDetailFlag = true;
  documentUploadFlag = false;
  defectRaiseFlag = false;
  defectSummaryFlag = false;
  defectBulkRaiseFlag = false;
  private projectDataUpdated = new Subscription();

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.projectId = paramMap.get('projectId');
    });
    this.getProjectDetail(this.projectId);
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
    this.defectRaiseFlag = false;
    this.iterationFlag = true;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  displayDetails() {
    this.defectRaiseFlag = false;
    this.projectDetailFlag = true;
    this.iterationFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  documentUpload() {
    this.defectRaiseFlag = false;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = true;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  defectRaise() {
    this.defectRaiseFlag = true;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = false;
  }

  defectSummary() {
    this.defectRaiseFlag = false;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = true;
    this.defectBulkRaiseFlag = false;
  }

  defectRaiseBulk() {
    this.defectRaiseFlag = false;
    this.iterationFlag = false;
    this.projectDetailFlag = false;
    this.documentUploadFlag = false;
    this.defectSummaryFlag = false;
    this.defectBulkRaiseFlag = true;
  }

}
