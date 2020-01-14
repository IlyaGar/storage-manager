import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeFiveRightActionComponent } from './vertical-three-five-right-action.component';

describe('VerticalThreeFiveRightActionComponent', () => {
  let component: VerticalThreeFiveRightActionComponent;
  let fixture: ComponentFixture<VerticalThreeFiveRightActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeFiveRightActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeFiveRightActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
