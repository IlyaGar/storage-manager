import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsNewTaskComponent } from './chips-new-task.component';

describe('ChipsNewTaskComponent', () => {
  let component: ChipsNewTaskComponent;
  let fixture: ComponentFixture<ChipsNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsNewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
