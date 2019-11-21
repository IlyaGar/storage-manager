import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoThreeActionComponent } from './vertical-two-three-action.component';

describe('VerticalTwoThreeActionComponent', () => {
  let component: VerticalTwoThreeActionComponent;
  let fixture: ComponentFixture<VerticalTwoThreeActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoThreeActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoThreeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
