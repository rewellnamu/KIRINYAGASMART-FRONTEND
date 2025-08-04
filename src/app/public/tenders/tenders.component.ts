import { Component, OnInit } from '@angular/core';
import { PublicService } from '../../shared/public.service';
import { Tender } from '../../models/tender.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class TendersComponent implements OnInit {
  tenders: Tender[] = [];
  searchText: string = '';
  selectedTender?: Tender;

  constructor(private publicService: PublicService) {}

  ngOnInit() {
    this.publicService.getTenders().subscribe(data => this.tenders = data);
  }

  get filteredTenders(): Tender[] {
    return this.tenders.filter(t =>
      t.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      t.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  viewTender(tender: Tender) {
    this.selectedTender = tender;
  }

  closeModal() {
    this.selectedTender = undefined;
  }
}
