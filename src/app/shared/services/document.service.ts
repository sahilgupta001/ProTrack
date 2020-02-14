import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn : 'root'
})

export class DocumentService {

  constructor(private http: HttpClient) {}

  uploadDocument(userId: string, projectId: string, type: string, description: string, file: File) {
    const documentData: any = new FormData();
    documentData.append('userId', userId);
    documentData.append('projectId', projectId);
    documentData.append('type', type);
    documentData.append('description', description);
    documentData.append('file', file);
    return this.http.post<{message: string}>('http://localhost:3000/api/document', documentData);
  }

  getDocuments(projectId: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{message: string, srs: any, installation_guide: any, test_plan: any, document4: any, document5: any}>('http://localhost:3000/api/document/getDocuments/' + projectId);
  }

  onDownload(projectId: string, type: string) {
    this.http.get('http://localhost:3000/api/document/download/' + projectId + '/' + type, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .subscribe(
      data => saveAs(data, type + '_' + projectId + '.pdf'),
      error => console.log(error)
    );
  }
}












