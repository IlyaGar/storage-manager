import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeThreeRightComponent } from './vertical-three-three-right.component';

describe('VerticalThreeThreeRightComponent', () => {
  let component: VerticalThreeThreeRightComponent;
  let fixture: ComponentFixture<VerticalThreeThreeRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeThreeRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeThreeRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
