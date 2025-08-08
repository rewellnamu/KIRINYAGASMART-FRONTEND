import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

export interface ProjectNotification { name: string; }
export interface NewsNotification { title: string; }
export interface TenderNotification { title: string; }

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private socket = io('http://localhost:5000');
  getNotifications: any;

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
