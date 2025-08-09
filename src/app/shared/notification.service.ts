import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';

export interface ProjectNotification { name: string; }
export interface NewsNotification { title: string; }
export interface TenderNotification { title: string; }

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private socket?: Socket; // Optional because SSR won't init

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Only connect socket in the browser
      this.socket = io('http://localhost:5000');
    }
  }

  /** Get raw socket instance (if in browser) */
  getNotifications() {
    return this.socket;
  }

  /** Listen for new news */
  onNewNews(callback: (data: NewsNotification) => void) {
    this.socket?.on('new-news', callback);
  }

  /** Listen for new projects */
  onNewProject(callback: (data: ProjectNotification) => void) {
    this.socket?.on('new-project', callback);
  }

  /** Listen for new tenders */
  onNewTender(callback: (data: TenderNotification) => void) {
    this.socket?.on('new-tender', callback);
  }
}
