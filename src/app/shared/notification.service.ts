import { Injectable } from '@angular/core';
import { Observable, fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { io } from 'socket.io-client';

export interface ProjectNotification { name: string; type: 'project'; }
export interface NewsNotification { title: string; type: 'news'; }
export interface TenderNotification { title: string; type: 'tender'; }

type AllNotifications = ProjectNotification | NewsNotification | TenderNotification;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private socket = io('http://localhost:5000');

  getNotifications(): Observable<AllNotifications> {
    const newsNotifications = fromEvent<NewsNotification>(this.socket, 'new-news')
      .pipe(map(data => ({ ...data, type: 'news' as const })));
    
    const projectNotifications = fromEvent<ProjectNotification>(this.socket, 'new-project')
      .pipe(map(data => ({ ...data, type: 'project' as const })));
    
    const tenderNotifications = fromEvent<TenderNotification>(this.socket, 'new-tender')
      .pipe(map(data => ({ ...data, type: 'tender' as const })));

    return merge(newsNotifications, projectNotifications, tenderNotifications);
  }

  // Keep individual methods if needed
  onNewNews(callback: (data: NewsNotification) => void) {
    this.socket.on('new-news', callback);
  }

  onNewProject(callback: (data: ProjectNotification) => void) {
    this.socket.on('new-project', callback);
  }

  onNewTender(callback: (data: TenderNotification) => void) {
    this.socket.on('new-tender', callback);
  }
}