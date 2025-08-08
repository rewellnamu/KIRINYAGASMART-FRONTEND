import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../shared/public.service';
import { News } from '../../models/news.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class NewsComponent implements OnInit {
  newsList: News[] = [];
  searchText: string = '';
  selectedNews?: News;

  constructor(private publicService: PublicService, private router: Router) {}

  ngOnInit() {
    this.publicService.getNews().subscribe(data => this.newsList = data);
  }

  get filteredNews(): News[] {
  return this.newsList.filter(n =>
    (n.title?.toLowerCase().includes(this.searchText.toLowerCase())) ||
    (n.summary?.toLowerCase().includes(this.searchText.toLowerCase()))
  );
}


  viewNews(news: News) {
    this.selectedNews = news;
  }

  closeModal() {
    this.selectedNews = undefined;}

     showNotification(message: string) {
    // Temporary simple alert
    alert(message);
    // Later: Replace with a toast notification
  }
}
