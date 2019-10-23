import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTwoThreeFourComponent } from './long-two-three-four.component';

describe('LongTwoThreeFourComponent', () => {
  let component: LongTwoThreeFourComponent;
  let fixture: ComponentFixture<LongTwoThreeFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTwoThreeFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTwoThreeFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
