import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalTwoFiveComponent } from './horizontal-two-five.component';

describe('HorizontalTwoFiveComponent', () => {
  let component: HorizontalTwoFiveComponent;
  let fixture: ComponentFixture<HorizontalTwoFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalTwoFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalTwoFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
