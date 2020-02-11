import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}












