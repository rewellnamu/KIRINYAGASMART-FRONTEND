import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicService } from '../../shared/public.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-manage-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.scss']
})
export class ManageProjectsComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = { name: '', description: '', status: 'planned' };

  constructor(private publicService: PublicService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.publicService.getProjects().subscribe(data => this.projects = data);
  }

  createProject() {
    this.publicService.addProject(this.newProject).subscribe(() => {
      this.loadProjects();
      this.newProject = { name: '', description: '', status: 'planned' };
    });
  }

  deleteProject(id: string) {
    this.publicService.deleteProject(id).subscribe(() => this.loadProjects());
  }
}
