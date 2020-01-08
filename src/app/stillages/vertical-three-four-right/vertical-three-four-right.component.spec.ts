import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeFourRightComponent } from './vertical-three-four-right.component';

describe('VerticalThreeFourRightComponent', () => {
  let component: VerticalThreeFourRightComponent;
  let fixture: ComponentFixture<VerticalThreeFourRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeFourRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeFourRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
