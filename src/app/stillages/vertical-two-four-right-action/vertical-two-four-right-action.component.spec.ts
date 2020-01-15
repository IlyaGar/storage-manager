import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoFourRightActionComponent } from './vertical-two-four-right-action.component';

describe('VerticalTwoFourRightActionComponent', () => {
  let component: VerticalTwoFourRightActionComponent;
  let fixture: ComponentFixture<VerticalTwoFourRightActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoFourRightActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoFourRightActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
