import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeFiveActionComponent } from './vertical-three-five-action.component';

describe('VerticalThreeFiveActionComponent', () => {
  let component: VerticalThreeFiveActionComponent;
  let fixture: ComponentFixture<VerticalThreeFiveActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeFiveActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeFiveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
