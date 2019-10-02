import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCellFormComponent } from './select-cell-form.component';

describe('SelectCellFormComponent', () => {
  let component: SelectCellFormComponent;
  let fixture: ComponentFixture<SelectCellFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCellFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCellFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
