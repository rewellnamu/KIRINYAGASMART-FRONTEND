import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/admin.service';
import { PublicService } from '../../shared/public.service';
import { Tender } from '../../models/tender.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-tenders',
  templateUrl: './manage-tenders.component.html',
  styleUrls: ['./manage-tenders.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ManageTendersComponent implements OnInit {
  tenders: Tender[] = [];
  tender: Tender = { title: '', description: '', deadline: '' };
  editingId: string | null = null;

  constructor(private adminService: AdminService, private publicService: PublicService) {}

  ngOnInit() { this.loadTenders(); }

  loadTenders() { this.publicService.getTenders().subscribe(data => this.tenders = data); }

  saveTender() {
    if (this.editingId) {
      this.adminService.updateTender(this.editingId, this.tender).subscribe(() => { this.loadTenders(); this.resetForm(); });
    } else {
      this.adminService.createTender(this.tender).subscribe(() => { this.loadTenders(); this.resetForm(); });
    }
  }

  editTender(tender: Tender) { this.tender = { ...tender }; this.editingId = tender._id || null; }

  deleteTender(id: string) { this.adminService.deleteTender(id).subscribe(() => this.loadTenders()); }

  resetForm() { this.tender = { title: '', description: '', deadline: '' }; this.editingId = null; }
}
