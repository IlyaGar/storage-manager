import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmsMapFormComponent } from './wms-map-form.component';

describe('WmsMapFormComponent', () => {
  let component: WmsMapFormComponent;
  let fixture: ComponentFixture<WmsMapFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmsMapFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmsMapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
