import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsTableComponent } from './applications-table.component';

describe('ApplicationsTableComponent', () => {
  let component: ApplicationsTableComponent;
  let fixture: ComponentFixture<ApplicationsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
