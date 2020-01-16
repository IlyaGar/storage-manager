import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellHistoryFormComponent } from './cell-history-form.component';

describe('CellHistoryFormComponent', () => {
  let component: CellHistoryFormComponent;
  let fixture: ComponentFixture<CellHistoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellHistoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
