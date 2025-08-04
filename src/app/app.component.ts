import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './general/navbar/navbar.component';
import { FooterComponent } from './general/footer/footer.component';
import { ChatbotComponent } from './shared/chatbot/chatbot.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kirinyaga-smart-app';
}
