import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTendersComponent } from './manage-tenders.component';

describe('ManageTendersComponent', () => {
  let component: ManageTendersComponent;
  let fixture: ComponentFixture<ManageTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
