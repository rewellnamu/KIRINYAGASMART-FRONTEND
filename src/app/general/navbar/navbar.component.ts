import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';
import { NotificationService, NewsNotification, ProjectNotification, TenderNotification } from '../../shared/notification.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NotificationsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  notifications: { message: string; date: Date; type: string }[] = [];
  unreadCount = 0;
  showNotifications = false;
  
  private destroy$ = new Subject<void>();

  constructor(
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Only initialize notifications in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeNotifications();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeNotifications() {
    // Listen for new news notifications
    this.notificationService.onNewNews((data: NewsNotification) => {
      this.addNotification(data.title, 'news');
    });

    // Listen for new project notifications
    this.notificationService.onNewProject((data: ProjectNotification) => {
      this.addNotification(data.name, 'project');
    });

    // Listen for new tender notifications
    this.notificationService.onNewTender((data: TenderNotification) => {
      this.addNotification(data.title, 'tender');
    });
  }

  private addNotification(message: string, type: string) {
    const notification = {
      message,
      date: new Date(),
      type
    };
    
    this.notifications.unshift(notification);
    this.unreadCount++;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    if (this.showNotifications) {
      this.unreadCount = 0;
    }
  }
}