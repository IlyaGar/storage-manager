import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoFiveComponent } from './vertical-two-five.component';

describe('VerticalTwoFiveComponent', () => {
  let component: VerticalTwoFiveComponent;
  let fixture: ComponentFixture<VerticalTwoFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
