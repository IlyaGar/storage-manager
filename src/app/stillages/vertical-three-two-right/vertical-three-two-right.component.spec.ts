import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeTwoRightComponent } from './vertical-three-two-right.component';

describe('VerticalThreeTwoRightComponent', () => {
  let component: VerticalThreeTwoRightComponent;
  let fixture: ComponentFixture<VerticalThreeTwoRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeTwoRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeTwoRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
