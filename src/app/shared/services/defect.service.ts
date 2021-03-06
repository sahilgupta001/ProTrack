import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Defect } from '../models/defect-model';
import { saveAs } from 'file-saver';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl + '/defect/';
@Injectable({
  providedIn: 'root'
})

export class DefectService {
  private defects: Defect;
  private defectsUpdated = new Subject<{ defects: Defect}>();

  constructor(private http: HttpClient) {}

  getDefectCategory() {
    return this.http.get<{message: string, data: any}>(BACKEND_URL + 'getCategory');
  }

  getDefectType() {
    return this.http.get<{message: string, data: any}>(BACKEND_URL + 'getType');
  }

  getDefectStatus() {
    return this.http.get<{message: string, data: any}>(BACKEND_URL + 'getStatus');
  }

  raiseDefect(data: Defect, projectId: string) {
    return this.http.post(BACKEND_URL + 'raiseDefect/' + projectId, data);
  }

  getDefectData(projectId: string) {
    this.http.get<{ message: string, defects: Defect }>(BACKEND_URL + 'getDefects/' + projectId)
      .subscribe(response => {
        console.log(response.message);
        this.defects = response.defects;
        this.defectsUpdated.next({
          defects: this.defects
        });
      });
  }

  getDefectUpdateListener() {
    return this.defectsUpdated.asObservable();
  }

  getUserDefects(projectId: string, userId: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<{ message: string, defects: Defect }>(BACKEND_URL + 'getUserDefects/' + projectId + '/' + userId);
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
    return this.http.post(BACKEND_URL + 'assignDefect', data);
  }

  bulkDefectUpload(projectId: string, file: File) {
    const defectData: any = new FormData();
    defectData.append('type', 'defects');
    defectData.append('projectId', projectId);
    defectData.append('file', file);
    return this.http.post(BACKEND_URL + 'bulkDefects', defectData);
  }

  onTemplateDownload() {
    this.http.get(BACKEND_URL + 'templateDownload', {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .subscribe(
      data => saveAs(data, 'defect-upload-template.csv'),
      error => console.log(error)
    );
  }

  exportDefects(projectId: string) {
    this.http.get(BACKEND_URL + 'exportDefects/' + projectId, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
    .subscribe(
      data => saveAs(data, 'defect-upload-template' + projectId + '.csv'),
      error => console.log(error)
    );
  }

  closeDefect(projectId: string, defectId: number) {
    const data = {
      // tslint:disable-next-line: object-literal-key-quotes
      'projectId': projectId,
      // tslint:disable-next-line: object-literal-key-quotes
      'defectId': defectId
    };
    return this.http.put(BACKEND_URL + 'closeDefect', data);
  }

  deleteDefect(projectId: string, defectId: number) {
    return this.http.delete(BACKEND_URL + 'deleteDefect/' + projectId + '/' + defectId);
  }
}
