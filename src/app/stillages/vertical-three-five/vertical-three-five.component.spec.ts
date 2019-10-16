import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeFiveComponent } from './vertical-three-five.component';

describe('VerticalThreeFiveComponent', () => {
  let component: VerticalThreeFiveComponent;
  let fixture: ComponentFixture<VerticalThreeFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
