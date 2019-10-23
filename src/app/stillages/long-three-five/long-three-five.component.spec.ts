import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongThreeFiveComponent } from './long-three-five.component';

describe('LongThreeFiveComponent', () => {
  let component: LongThreeFiveComponent;
  let fixture: ComponentFixture<LongThreeFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongThreeFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongThreeFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
