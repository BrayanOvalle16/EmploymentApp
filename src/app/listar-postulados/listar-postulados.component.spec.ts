import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPostuladosComponent } from './listar-postulados.component';

describe('ListarPostuladosComponent', () => {
  let component: ListarPostuladosComponent;
  let fixture: ComponentFixture<ListarPostuladosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPostuladosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarPostuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
