import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicService } from '../../shared/public.service';
import { Tender } from '../../models/tender.model';

@Component({
  selector: 'app-manage-tenders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-tenders.component.html',
  styleUrls: ['./manage-tenders.component.scss']
})
export class ManageTendersComponent implements OnInit {
  tenders: Tender[] = [];
  newTender: Tender = { title: '', description: '', closingDate: new Date(), documentUrl: '' };

  constructor(private publicService: PublicService) {}

  ngOnInit() {
    this.loadTenders();
  }

  loadTenders() {
    this.publicService.getTenders().subscribe(data => this.tenders = data);
  }

  createTender() {
    this.publicService.addTender(this.newTender).subscribe(() => {
      this.loadTenders();
      this.newTender = { title: '', description: '', closingDate: new Date(), documentUrl: '' };
    });
  }

  deleteTender(id: string) {
    this.publicService.deleteTender(id).subscribe(() => this.loadTenders());
  }
}
