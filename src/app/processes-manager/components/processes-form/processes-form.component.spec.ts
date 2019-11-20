import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesFormComponent } from './processes-form.component';

describe('ProcessesFormComponent', () => {
  let component: ProcessesFormComponent;
  let fixture: ComponentFixture<ProcessesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
