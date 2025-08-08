import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicService } from '../../shared/public.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-manage-news',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.scss']
})
export class ManageNewsComponent implements OnInit {
  newsList: News[] = [];
  newNews: News = {
    title: '', content: '', image: '',
    summary: undefined,
  };

  constructor(private publicService: PublicService) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.publicService.getNews().subscribe(data => this.newsList = data);
  }

  createNews() {
    this.publicService.addNews(this.newNews).subscribe(() => {
      this.loadNews();
      this.newNews = { title: '', content: '', image: '', summary: undefined };
    });
  }

  deleteNews(id: string) {
    this.publicService.deleteNews(id).subscribe(() => this.loadNews());
  }
}
