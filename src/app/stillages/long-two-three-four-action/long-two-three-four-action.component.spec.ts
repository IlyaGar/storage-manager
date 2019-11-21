import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTwoThreeFourActionComponent } from './long-two-three-four-action.component';

describe('LongTwoThreeFourActionComponent', () => {
  let component: LongTwoThreeFourActionComponent;
  let fixture: ComponentFixture<LongTwoThreeFourActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTwoThreeFourActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTwoThreeFourActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
