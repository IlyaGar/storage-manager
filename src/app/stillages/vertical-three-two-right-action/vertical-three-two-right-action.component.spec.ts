import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeTwoRightActionComponent } from './vertical-three-two-right-action.component';

describe('VerticalThreeTwoRightActionComponent', () => {
  let component: VerticalThreeTwoRightActionComponent;
  let fixture: ComponentFixture<VerticalThreeTwoRightActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeTwoRightActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeTwoRightActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
