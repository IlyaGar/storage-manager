import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoFourActionComponent } from './vertical-two-four-action.component';

describe('VerticalTwoFourActionComponent', () => {
  let component: VerticalTwoFourActionComponent;
  let fixture: ComponentFixture<VerticalTwoFourActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoFourActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoFourActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
