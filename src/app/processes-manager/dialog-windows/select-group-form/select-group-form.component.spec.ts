import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGroupFormComponent } from './select-group-form.component';

describe('SelectGroupFormComponent', () => {
  let component: SelectGroupFormComponent;
  let fixture: ComponentFixture<SelectGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
