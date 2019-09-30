import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VertverticalThreeFourComponent } from './vertvertical-three-four.component';

describe('VertverticalThreeFourComponent', () => {
  let component: VertverticalThreeFourComponent;
  let fixture: ComponentFixture<VertverticalThreeFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VertverticalThreeFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VertverticalThreeFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
