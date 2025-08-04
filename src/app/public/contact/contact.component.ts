import { Component } from '@angular/core';
import { PublicService } from '../../shared/public.service';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  contact: Contact = { name: '', email: '', message: '' };
  autoReply = '';
  success = '';
  error = '';

  constructor(private publicService: PublicService) {}

  onSubmit() {
    this.publicService.sendContact(this.contact).subscribe({
      next: (res) => {
        this.success = res.message;
        this.autoReply = res.autoReply;
        this.contact = { name: '', email: '', message: '' };
      },
      error: () => this.error = 'Something went wrong. Please try again.'
    });
  }
}
