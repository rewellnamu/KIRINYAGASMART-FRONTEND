import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/notification.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit {
  notifications: string[] = [];

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.notificationService.onNewNews((data) => this.notifications.push(`New News: ${data.title}`));
    this.notificationService.onNewProject((data) => this.notifications.push(`New Project: ${data.name}`));
    this.notificationService.onNewTender((data) => this.notifications.push(`New Tender: ${data.title}`));
  }

  logout() {
    this.authService.logout();
  }
}
