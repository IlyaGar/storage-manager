import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationNewTaskFormComponent } from './confirmation-new-task-form.component';

describe('ConfirmationNewTaskFormComponent', () => {
  let component: ConfirmationNewTaskFormComponent;
  let fixture: ComponentFixture<ConfirmationNewTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationNewTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationNewTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
