import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeFourActionComponent } from './vertical-three-four-action.component';

describe('VerticalThreeFourActionComponent', () => {
  let component: VerticalThreeFourActionComponent;
  let fixture: ComponentFixture<VerticalThreeFourActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeFourActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeFourActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
