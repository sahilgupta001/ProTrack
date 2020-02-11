import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../modules/admin-module/project/project.service';
import { Project } from '../../modules/admin-module/project/project.model';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './home-project-list.component.html',
    styleUrls: ['./home-project-list.component.css']
})

export class HomeProjectListComponent implements OnInit {
    projects: Project;
    private userProjectsSub = new Subscription();
    roleId: string;
    userId: string;
    constructor(private projectService: ProjectService) {}

    ngOnInit() {
        this.userId = localStorage.getItem('userId');
        this.projectService.findUserProjects(this.userId);
        this.userProjectsSub = this.projectService.getProjectsUpdatedListener()
            .subscribe((projectData: { projects: Project }) => {
                this.projects = projectData.projects;
            });
    }
}
