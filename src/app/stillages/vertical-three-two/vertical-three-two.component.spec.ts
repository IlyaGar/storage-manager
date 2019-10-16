import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeTwoComponent } from './vertical-three-two.component';

describe('VerticalThreeTwoComponent', () => {
  let component: VerticalThreeTwoComponent;
  let fixture: ComponentFixture<VerticalThreeTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
