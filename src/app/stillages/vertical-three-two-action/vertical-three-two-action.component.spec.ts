import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeTwoActionComponent } from './vertical-three-two-action.component';

describe('VerticalThreeTwoActionComponent', () => {
  let component: VerticalThreeTwoActionComponent;
  let fixture: ComponentFixture<VerticalThreeTwoActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeTwoActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeTwoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
