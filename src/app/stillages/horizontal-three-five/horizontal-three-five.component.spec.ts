import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalThreeFiveComponent } from './horizontal-three-five.component';

describe('HorizontalThreeFiveComponent', () => {
  let component: HorizontalThreeFiveComponent;
  let fixture: ComponentFixture<HorizontalThreeFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalThreeFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalThreeFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
