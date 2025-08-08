import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  @Input() notifications: any[] = [];

  constructor(private router: Router) {}

  openNotification(notification: any) {
    if (notification.link) {
      this.router.navigate([notification.link]);
    }
  }
}
