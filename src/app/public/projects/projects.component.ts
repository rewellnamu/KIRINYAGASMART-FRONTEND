import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../shared/public.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service'; // <-- Import

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

  constructor(
    private publicService: PublicService,
    private notificationService: NotificationService,
  ) {}
  ngOnInit(): void {
    this.loadProjects();
  }
  loadProjects() {
    this.publicService.getProjects().subscribe({
      next: (data: Project[]) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error loading projects:', error);
      }
    });
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

  showNotification(message: string) {
    // Temporary simple alert
    alert(message);
    // Later: Replace with a toast notification
  }
}
