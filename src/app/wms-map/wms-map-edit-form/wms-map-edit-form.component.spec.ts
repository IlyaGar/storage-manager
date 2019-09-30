import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WmsMapEditFormComponent } from './wms-map-edit-form.component';

describe('WmsMapFormComponent', () => {
  let component: WmsMapEditFormComponent;
  let fixture: ComponentFixture<WmsMapEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WmsMapEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WmsMapEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
