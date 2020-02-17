import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const BACKEND_URL = environment.apiUrl + '/project/';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  projects: Project;
  currentProject: Project;
  iterationData: any;

  private projectsUpdated = new Subject<{ projects: Project }>();
  private managerProjectsUpdated = new Subject<{ projects: Project }>();
  private currentProjectDataUpdated = new Subject<{ project: Project, iterationData: any }>();
  constructor(private http: HttpClient) {}

  initializeProject(project: Project) {
    this.http.post(BACKEND_URL, project)
      .subscribe(result => {
        console.log(result);
      });
  }

  getProjectDetail(projectId: string) {
    // tslint:disable-next-line: max-line-length
    this.http.get<{message: string, iterationData: any, projectData: Project}>(BACKEND_URL + 'projectDetail/' + projectId)
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
      this.http.get<{message: string, projects: Project, length: number}>(BACKEND_URL)
      .subscribe(projectData => {
        this.projects = projectData.projects;
        this.projectsUpdated.next({
          projects: this.projects
        });
      });
    } else {
      // tslint:disable-next-line: max-line-length
      return this.http.get<{message: string, projects: Project, length: number}>(BACKEND_URL + 'forDepartment/' + departmentId);
    }
  }

  findUserProjects(userId: string) {
    this.http.get<{message: string, projects: Project}>(BACKEND_URL + 'userProjects/' + userId)
    .subscribe(projectData => {
      this.projects = projectData.projects;
      console.log(this.projects);
      this.projectsUpdated.next({
        projects: this.projects
      });
    });
  }

  findManagerProjects(userId: string) {
    this.http.get<{message: string, projects: Project}>(BACKEND_URL + 'managerProjects/' + userId)
    .subscribe(projectData => {
      this.projects = projectData.projects;
      console.log(this.projects);
      this.managerProjectsUpdated.next({
        projects: this.projects
      });
    });
  }

  getProjectsUpdatedListener() {
    return this.projectsUpdated.asObservable();
  }

  getManagerProjectsUpdatedListener() {
    return this.managerProjectsUpdated.asObservable();
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

    this.http.post(BACKEND_URL + 'assignProject', data)
      .subscribe(result => {
        console.log(result);
      });
  }

  assignUser(projectId: string, userId: number) {
    const data = {
      // tslint:disable-next-line: object-literal-shorthand
      // tslint:disable-next-line: object-literal-key-quotes
      'projectId': projectId,
      // tslint:disable-next-line: object-literal-key-quotes
      'userId': userId
    };
    this.http.post(BACKEND_URL + 'assignUser', data)
      .subscribe(response => {
        console.log(response);
      });
  }
}
