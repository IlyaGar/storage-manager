import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameDocFormComponent } from './name-doc-form.component';

describe('NameDocFormComponent', () => {
  let component: NameDocFormComponent;
  let fixture: ComponentFixture<NameDocFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameDocFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameDocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
