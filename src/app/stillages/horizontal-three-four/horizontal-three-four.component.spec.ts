import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalThreeFourComponent } from './horizontal-three-four.component';

describe('HorizontalThreeFourComponent', () => {
  let component: HorizontalThreeFourComponent;
  let fixture: ComponentFixture<HorizontalThreeFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalThreeFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalThreeFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
