import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalTwoFourComponent } from './horizontal-two-four.component';

describe('HorizontalTwoFourComponent', () => {
  let component: HorizontalTwoFourComponent;
  let fixture: ComponentFixture<HorizontalTwoFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalTwoFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalTwoFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
