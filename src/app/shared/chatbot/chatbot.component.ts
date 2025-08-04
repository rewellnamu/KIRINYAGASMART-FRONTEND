import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  isOpen = false;
  userInput = '';
  messages: { text: string; type: 'user' | 'bot' }[] = [];

  private apiUrl = 'http://localhost:5000/api/ai/chat';

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;
    this.messages.push({ text: this.userInput, type: 'user' });

    this.http.post<{ answer: string }>(this.apiUrl, { question: this.userInput }).subscribe({
      next: (res) => {
        this.messages.push({ text: res.answer, type: 'bot' });
      },
      error: () => {
        this.messages.push({ text: 'Sorry, something went wrong.', type: 'bot' });
      }
    });

    this.userInput = '';
  }
}
