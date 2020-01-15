import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoFiveRightComponent } from './vertical-two-five-right.component';

describe('VerticalTwoFiveRightComponent', () => {
  let component: VerticalTwoFiveRightComponent;
  let fixture: ComponentFixture<VerticalTwoFiveRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoFiveRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoFiveRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
