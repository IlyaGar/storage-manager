import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoFourComponent } from './vertical-two-four.component';

describe('VerticalTwoFourComponent', () => {
  let component: VerticalTwoFourComponent;
  let fixture: ComponentFixture<VerticalTwoFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
