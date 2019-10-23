import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongThreeFourComponent } from './long-three-four.component';

describe('LongThreeFourComponent', () => {
  let component: LongThreeFourComponent;
  let fixture: ComponentFixture<LongThreeFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongThreeFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongThreeFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
