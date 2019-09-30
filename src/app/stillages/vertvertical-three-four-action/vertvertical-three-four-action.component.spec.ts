import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VertverticalThreeFourActionComponent } from './vertvertical-three-four-action.component';

describe('VertverticalThreeFourActionComponent', () => {
  let component: VertverticalThreeFourActionComponent;
  let fixture: ComponentFixture<VertverticalThreeFourActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VertverticalThreeFourActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VertverticalThreeFourActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
