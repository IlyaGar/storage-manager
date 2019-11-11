import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProcessesFormComponent } from './select-processes-form.component';

describe('SelectProcessesFormComponent', () => {
  let component: SelectProcessesFormComponent;
  let fixture: ComponentFixture<SelectProcessesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectProcessesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProcessesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
