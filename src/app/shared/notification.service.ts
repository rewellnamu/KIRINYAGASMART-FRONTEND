import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private socket = io('http://localhost:5000');

  onNewNews(callback: (data: any) => void) {
    this.socket.on('new-news', callback);
  }

  onNewProject(callback: (data: any) => void) {
    this.socket.on('new-project', callback);
  }

  onNewTender(callback: (data: any) => void) {
    this.socket.on('new-tender', callback);
  }

  getNotifications(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('notification', (data) => observer.next(data));
    });
  }
}
