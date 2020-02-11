import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Defect } from '../models/defect-model';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})

export class DefectService {

  constructor(private http: HttpClient) {}

  getDefectCategory() {
    return this.http.get<{message: string, data: any}>('http://localhost:3000/api/defect/getCategory');
  }

  getDefectType() {
    return this.http.get<{message: string, data: any}>('http://localhost:3000/api/defect/getType');
  }

  getDefectStatus() {
    return this.http.get<{message: string, data: any}>('http://localhost:3000/api/defect/getStatus');
  }

  raiseDefect(data: Defect, projectId: string) {
    return this.http.post('http://localhost:3000/api/defect/raiseDefect/' + projectId, data);
  }

  getDefectData(projectId: string) {
    return this.http.get<{ message: string, defects: Defect }>('http://localhost:3000/api/defect/getDefects/' + projectId);
  }

  assignDefect(projectId: string, defectId: number, departmentId: string, userId: number) {
    const data = {
      // tslint:disable-next-line: object-literal-key-quotes
      'projectId': projectId,
      // tslint:disable-next-line: object-literal-key-quotes
      'defectId': defectId,
      // tslint:disable-next-line: object-literal-key-quotes
      'departmentId': departmentId,
      // tslint:disable-next-line: object-literal-key-quotes
      'userId': userId
    };
    return this.http.post('http://localhost:3000/api/defect/assignDefect', data);
  }

  bulkDefectUpload(projectId: string, file: File) {
    const defectData: any = new FormData();
    defectData.append('type', 'defects');
    defectData.append('projectId', projectId);
    defectData.append('file', file);
    return this.http.post('http://localhost:3000/api/defect/bulkDefects', defectData);
  }

  onTemplateDownload() {
    this.http.get('http://localhost:3000/api/defect/templateDownload', {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .subscribe(
      data => saveAs(data, 'defect-upload-template'),
      error => console.log(error)
    );
  }
}
