import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../notification.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  showDropdown = false;
  private socket: Socket | undefined;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();

    // Connect to backend Socket.IO server
    this.socket = io('http://localhost:5000'); // Change port if needed

    // Listen for new notifications
    this.socket.on('new-news', (news) => {
      this.notifications.unshift(news);
    });
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notifications = data;
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
