import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLeadsComponent } from './table-lead.component';

describe('TableLeadsComponent', () => {
  let component: TableLeadsComponent;
  let fixture: ComponentFixture<TableLeadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLeadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
