import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoFiveRightActionComponent } from './vertical-two-five-right-action.component';

describe('VerticalTwoFiveRightActionComponent', () => {
  let component: VerticalTwoFiveRightActionComponent;
  let fixture: ComponentFixture<VerticalTwoFiveRightActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoFiveRightActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoFiveRightActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
