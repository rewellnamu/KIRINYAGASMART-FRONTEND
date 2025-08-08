import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news.model';
import { Project } from '../models/project.model';
import { Tender } from '../models/tender.model';
import { Contact } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class PublicService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  // -------- NEWS --------
  getNews() {
    return this.http.get<News[]>(`${this.apiUrl}/news`);
  }
  addNews(news: News) {
    return this.http.post<News>(`${this.apiUrl}/news`, news);
  }
  deleteNews(id: string) {
    return this.http.delete(`${this.apiUrl}/news/${id}`);
  }

  // -------- PROJECTS --------
  getProjects() {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }
  addProject(project: Project) {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project);
  }
  deleteProject(id: string) {
    return this.http.delete(`${this.apiUrl}/projects/${id}`);
  }

  // -------- TENDERS --------
  getTenders() {
    return this.http.get<Tender[]>(`${this.apiUrl}/tenders`);
  }
  addTender(tender: Tender) {
    return this.http.post<Tender>(`${this.apiUrl}/tenders`, tender);
  }
  deleteTender(id: string) {
    return this.http.delete(`${this.apiUrl}/tenders/${id}`);
  }

  // -------- CONTACT --------
  sendContact(contact: Contact) {
    return this.http.post<{ message: string; autoReply: string }>(
      `${this.apiUrl}/contacts`,
      contact
    );
  }
}
