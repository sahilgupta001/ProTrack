import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projects: Project;
  private projectsUpdated = new Subject<{ projects: Project }>();

  constructor(private http: HttpClient) {}

  initializeProject(project: Project) {
    this.http.post('http://localhost:3000/api/project', project)
      .subscribe(result => {
        console.log(result);
      });
  }

  findProjects(departmentId: string) {
    if (departmentId === null) {
      this.http.get<{message: string, projects: Project, length: number}>('http://localhost:3000/api/project/')
      .subscribe(projectData => {
        this.projects = projectData.projects;
        this.projectsUpdated.next({
          projects: this.projects
        });
      });
    } else {
      return this.http.get<{message: string, projects: Project, length: number}>('http://localhost:3000/api/project/' + departmentId);
    }
  }

  getProjectsUpdatedListener() {
    return this.projectsUpdated.asObservable();
  }

  assignProject(projectId: string, status: string, department: string, manager: string, currentDepartment: string) {
    const assignedBy = localStorage.getItem('userId');
    console.log(assignedBy);
    const data = {
    projectId: projectId,
    status: status,
    department: department,
    manager: manager,
    previousDepartment: currentDepartment,
    assignedBy: assignedBy
    };
    
    this.http.post('http://localhost:3000/api/project/assignProject', data)
      .subscribe(result => {
        console.log(result);
      });
  }

}
