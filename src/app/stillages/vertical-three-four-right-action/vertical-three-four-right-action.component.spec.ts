import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeFourRightActionComponent } from './vertical-three-four-right-action.component';

describe('VerticalThreeFourRightActionComponent', () => {
  let component: VerticalThreeFourRightActionComponent;
  let fixture: ComponentFixture<VerticalThreeFourRightActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeFourRightActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeFourRightActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
