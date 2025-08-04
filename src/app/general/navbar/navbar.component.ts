import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from '../../shared/notifications/notifications.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NotificationsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
