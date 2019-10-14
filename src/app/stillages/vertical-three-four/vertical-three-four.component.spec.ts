import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeFourComponent } from './vertical-three-four.component';

describe('VerticalThreeFourComponent', () => {
  let component: VerticalThreeFourComponent;
  let fixture: ComponentFixture<VerticalThreeFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});