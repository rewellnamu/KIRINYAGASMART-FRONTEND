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

  // News
  getNews() {
    return this.http.get<News[]>(`${this.apiUrl}/news`);
  }

  getNewsById(id: string) {
    return this.http.get<News>(`${this.apiUrl}/news/${id}`);
  }

  // Projects
  getProjects() {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string) {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }

  // Tenders
  getTenders() {
    return this.http.get<Tender[]>(`${this.apiUrl}/tenders`);
  }

  getTenderById(id: string) {
    return this.http.get<Tender>(`${this.apiUrl}/tenders/${id}`);
  }

  // Contact
  sendContact(contact: Contact) {
    return this.http.post<{ message: string; autoReply: string }>(`${this.apiUrl}/contacts`, contact);
  }
}
