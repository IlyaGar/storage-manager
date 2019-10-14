import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalThreeThreeComponent } from './vertical-three-three.component';

describe('VerticalThreeThreeComponent', () => {
  let component: VerticalThreeThreeComponent;
  let fixture: ComponentFixture<VerticalThreeThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalThreeThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalThreeThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
