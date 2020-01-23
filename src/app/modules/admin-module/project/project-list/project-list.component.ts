import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.css']
})

export class ProjectListComponent implements OnInit{
    projects: Project;
    private projectsSub = new Subscription;
    constructor(private projectService: ProjectService) {}

    ngOnInit() {
        this.projectService.findProjects(null);
        this.projectsSub = this.projectService.getProjectsUpdatedListener()
            .subscribe((projectData: { projects: Project }) => {
                this.projects = projectData.projects;
            });
    }
}