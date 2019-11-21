import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoFiveActionComponent } from './vertical-two-five-action.component';

describe('VerticalTwoFiveActionComponent', () => {
  let component: VerticalTwoFiveActionComponent;
  let fixture: ComponentFixture<VerticalTwoFiveActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoFiveActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoFiveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
