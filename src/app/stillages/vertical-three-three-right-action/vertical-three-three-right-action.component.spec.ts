import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeThreeRightActionComponent } from './vertical-three-three-right-action.component';

describe('VerticalThreeThreeRightActionComponent', () => {
  let component: VerticalThreeThreeRightActionComponent;
  let fixture: ComponentFixture<VerticalThreeThreeRightActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeThreeRightActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeThreeRightActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
