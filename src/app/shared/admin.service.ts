import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news.model';
import { Project } from '../models/project.model';
import { Tender } from '../models/tender.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // NEWS
  createNews(data: News) { return this.http.post(`${this.apiUrl}/news`, data); }
  updateNews(id: string, data: News) { return this.http.put(`${this.apiUrl}/news/${id}`, data); }
  deleteNews(id: string) { return this.http.delete(`${this.apiUrl}/news/${id}`); }

  // PROJECTS
  createProject(data: Project) { return this.http.post(`${this.apiUrl}/projects`, data); }
  updateProject(id: string, data: Project) { return this.http.put(`${this.apiUrl}/projects/${id}`, data); }
  deleteProject(id: string) { return this.http.delete(`${this.apiUrl}/projects/${id}`); }

  // TENDERS
  createTender(data: Tender) { return this.http.post(`${this.apiUrl}/tenders`, data); }
  updateTender(id: string, data: Tender) { return this.http.put(`${this.apiUrl}/tenders/${id}`, data); }
  deleteTender(id: string) { return this.http.delete(`${this.apiUrl}/tenders/${id}`); }
}
