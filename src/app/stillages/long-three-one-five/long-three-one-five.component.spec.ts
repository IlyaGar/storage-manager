import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongThreeOneFiveComponent } from './long-three-one-five.component';

describe('LongThreeOneFiveComponent', () => {
  let component: LongThreeOneFiveComponent;
  let fixture: ComponentFixture<LongThreeOneFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongThreeOneFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongThreeOneFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
