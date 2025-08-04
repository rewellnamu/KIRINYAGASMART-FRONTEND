import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import { PublicService } from '../../shared/public.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-projects',
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ManageProjectsComponent implements OnInit {
  projects: Project[] = [];
  project: Project = { name: '', description: '', status: '' };
  editingId: string | null = null;

  constructor(private adminService: AdminService, private publicService: PublicService) {}

  ngOnInit() { this.loadProjects(); }

  loadProjects() { this.publicService.getProjects().subscribe(data => this.projects = data); }

  saveProject() {
    if (this.editingId) {
      this.adminService.updateProject(this.editingId, this.project).subscribe(() => { this.loadProjects(); this.resetForm(); });
    } else {
      this.adminService.createProject(this.project).subscribe(() => { this.loadProjects(); this.resetForm(); });
    }
  }

  editProject(project: Project) { this.project = { ...project }; this.editingId = project._id || null; }

  deleteProject(id: string) { this.adminService.deleteProject(id).subscribe(() => this.loadProjects()); }

  resetForm() { this.project = { name: '', description: '', status: '' }; this.editingId = null; }
}
