import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalTwoThreeComponent } from './vertical-two-three.component';

describe('VerticalTwoThreeComponent', () => {
  let component: VerticalTwoThreeComponent;
  let fixture: ComponentFixture<VerticalTwoThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalTwoThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalTwoThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
