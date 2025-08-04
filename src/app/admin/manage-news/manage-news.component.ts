import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import { PublicService } from '../../shared/public.service';
import { News } from '../../models/news.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ManageNewsComponent implements OnInit {
  newsList: News[] = [];
  news: News = { title: '', content: '' };
  editingId: string | null = null;

  constructor(private adminService: AdminService, private publicService: PublicService) {}

  ngOnInit() { this.loadNews(); }

  loadNews() { this.publicService.getNews().subscribe(data => this.newsList = data); }

  saveNews() {
    if (this.editingId) {
      this.adminService.updateNews(this.editingId, this.news).subscribe(() => { this.loadNews(); this.resetForm(); });
    } else {
      this.adminService.createNews(this.news).subscribe(() => { this.loadNews(); this.resetForm(); });
    }
  }

  editNews(news: News) { this.news = { ...news }; this.editingId = news._id || null; }

  deleteNews(id: string) { this.adminService.deleteNews(id).subscribe(() => this.loadNews()); }

  resetForm() { this.news = { title: '', content: '' }; this.editingId = null; }
}
