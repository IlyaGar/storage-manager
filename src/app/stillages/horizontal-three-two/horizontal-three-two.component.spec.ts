import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalThreeTwoComponent } from './horizontal-three-two.component';

describe('HorizontalThreeTwoComponent', () => {
  let component: HorizontalThreeTwoComponent;
  let fixture: ComponentFixture<HorizontalThreeTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalThreeTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalThreeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
