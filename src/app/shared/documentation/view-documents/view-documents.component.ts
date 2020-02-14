import { Component, Input, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-view',
  templateUrl: './view-documents.component.html'
})

export class ViewDocumentsComponent implements OnInit {
  @Input() projectId: string;
  srs: any;
  installationGuide: any;
  testPlan: any;
  document4: any;
  document5: any;
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.findDocuments();
  }


  findDocuments() {
    this.documentService.getDocuments(this.projectId)
      .subscribe(response => {
        if (response.srs) {
          this.srs = response.srs;
        }
        if (response.installation_guide) {
          this.installationGuide = response.installation_guide;
        }
        if (response.test_plan) {
          this.testPlan = response.test_plan;
        }
        if (response.document4) {
          this.document4 = response.document4;
        }
        if (response.document5) {
          this.document5 = response.document5;
        }
      });
  }

  onDownload(type: string) {
    this.documentService.onDownload(this.projectId, type);
  }
}
