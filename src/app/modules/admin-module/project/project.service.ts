import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projects: Project;
  currentProject: Project;
  iterationData: any;

  private projectsUpdated = new Subject<{ projects: Project }>();
  private currentProjectDataUpdated = new Subject<{ project: Project, iterationData: any }>();
  constructor(private http: HttpClient) {}

  initializeProject(project: Project) {
    this.http.post('http://localhost:3000/api/project', project)
      .subscribe(result => {
        console.log(result);
      });
  }

  getProjectDetail(projectId: string) {
    // tslint:disable-next-line: max-line-length
    this.http.get<{message: string, iterationData: any, projectData: Project}>('http://localhost:3000/api/project/projectDetail/' + projectId)
    .subscribe(response => {
      this.currentProject = response.projectData;
      this.iterationData = response.iterationData;
      this.currentProjectDataUpdated.next({
        project: this.currentProject,
        iterationData: this.iterationData
      });
    });
  }

  getCurrentProjectDataUpdated() {
    return this.currentProjectDataUpdated.asObservable();
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
      // tslint:disable-next-line: max-line-length
      return this.http.get<{message: string, projects: Project, length: number}>('http://localhost:3000/api/project/forDepartment/' + departmentId);
    }
  }

  findUserProjects(userId: string) {
    this.http.get<{message: string, projects: Project, length: number}>('http://localhost:3000/api/project/userProjects/' + userId)
    .subscribe(projectData => {
      this.projects = projectData.projects;
      this.projectsUpdated.next({
        projects: this.projects
      });
    });
  }

  getProjectsUpdatedListener() {
    return this.projectsUpdated.asObservable();
  }

  assignProject(projectId: string, status: string, department: string, manager: string, currentDepartment: string) {
    const assignedBy = localStorage.getItem('userId');
    const data = {
    // tslint:disable-next-line: object-literal-shorthand
    projectId: projectId,
    // tslint:disable-next-line: object-literal-shorthand
    status: status,
    // tslint:disable-next-line: object-literal-shorthand
    department: department,
    // tslint:disable-next-line: object-literal-shorthand
    manager: manager,
    previousDepartment: currentDepartment,
    // tslint:disable-next-line: object-literal-shorthand
    assignedBy: assignedBy
    };

    this.http.post('http://localhost:3000/api/project/assignProject', data)
      .subscribe(result => {
        console.log(result);
      });
  }

}
