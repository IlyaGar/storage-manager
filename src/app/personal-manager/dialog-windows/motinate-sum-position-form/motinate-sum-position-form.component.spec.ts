import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotinateSumPositionFormComponent } from './motinate-sum-position-form.component';

describe('MotinateSumPositionFormComponent', () => {
  let component: MotinateSumPositionFormComponent;
  let fixture: ComponentFixture<MotinateSumPositionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotinateSumPositionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotinateSumPositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
