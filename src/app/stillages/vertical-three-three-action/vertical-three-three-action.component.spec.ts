import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeThreeActionComponent } from './vertical-three-three-action.component';

describe('VerticalThreeThreeActionComponent', () => {
  let component: VerticalThreeThreeActionComponent;
  let fixture: ComponentFixture<VerticalThreeThreeActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeThreeActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeThreeActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
