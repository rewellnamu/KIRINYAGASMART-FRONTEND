import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../shared/public.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  selectedProject?: Project;
  searchText: string = '';

  constructor(private publicService: PublicService) {}

  ngOnInit() {
    this.publicService.getProjects().subscribe(data => this.projects = data);
  }

  get filteredProjects() {
    return this.projects.filter(p =>
      p.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      p.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  viewProject(project: Project) {
    this.selectedProject = project;
  }

  closeModal() {
    this.selectedProject = undefined;
  }
}
