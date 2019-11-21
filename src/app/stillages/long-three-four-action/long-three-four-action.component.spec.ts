import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongThreeFourActionComponent } from './long-three-four-action.component';

describe('LongThreeFourActionComponent', () => {
  let component: LongThreeFourActionComponent;
  let fixture: ComponentFixture<LongThreeFourActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongThreeFourActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongThreeFourActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
