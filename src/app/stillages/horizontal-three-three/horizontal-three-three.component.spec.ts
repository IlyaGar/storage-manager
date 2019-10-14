import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalThreeThreeComponent } from './horizontal-three-three.component';

describe('HorizontalThreeThreeComponent', () => {
  let component: HorizontalThreeThreeComponent;
  let fixture: ComponentFixture<HorizontalThreeThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalThreeThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalThreeThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
