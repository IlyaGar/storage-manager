import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongThreeFiveActionComponent } from './long-three-five-action.component';

describe('LongThreeFiveActionComponent', () => {
  let component: LongThreeFiveActionComponent;
  let fixture: ComponentFixture<LongThreeFiveActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongThreeFiveActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongThreeFiveActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
