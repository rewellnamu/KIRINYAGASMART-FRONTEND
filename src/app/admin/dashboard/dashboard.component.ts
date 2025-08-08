import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../shared/notification.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  notifications: { message: string; date: Date; type: string }[] = [];

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.notificationService.onNewNews((data: any) =>
      this.notifications.unshift({ message: `New News: ${data.title}`, date: new Date(), type: 'news' })
    );
    this.notificationService.onNewProject((data: any) =>
      this.notifications.unshift({ message: `New Project: ${data.name}`, date: new Date(), type: 'project' })
    );
    this.notificationService.onNewTender((data: any) =>
      this.notifications.unshift({ message: `New Tender: ${data.title}`, date: new Date(), type: 'tender' })
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
