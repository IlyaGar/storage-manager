import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeFiveRightComponent } from './vertical-three-five-right.component';

describe('VerticalThreeFiveRightComponent', () => {
  let component: VerticalThreeFiveRightComponent;
  let fixture: ComponentFixture<VerticalThreeFiveRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeFiveRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeFiveRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
