import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongThreeOneFiveActionComponent } from './long-three-one-five-action.component';

describe('LongThreeOneFiveActionComponent', () => {
  let component: LongThreeOneFiveActionComponent;
  let fixture: ComponentFixture<LongThreeOneFiveActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongThreeOneFiveActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongThreeOneFiveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
