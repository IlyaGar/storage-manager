import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalThreeFourActionComponent } from './horizontal-three-four-action.component';

describe('HorizontalThreeFourActionComponent', () => {
  let component: HorizontalThreeFourActionComponent;
  let fixture: ComponentFixture<HorizontalThreeFourActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalThreeFourActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalThreeFourActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
