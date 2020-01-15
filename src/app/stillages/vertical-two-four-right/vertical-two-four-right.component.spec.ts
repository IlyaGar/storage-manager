import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoFourRightComponent } from './vertical-two-four-right.component';

describe('VerticalTwoFourRightComponent', () => {
  let component: VerticalTwoFourRightComponent;
  let fixture: ComponentFixture<VerticalTwoFourRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoFourRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoFourRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
