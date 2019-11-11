import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDocFormComponent } from './detail-doc-form.component';

describe('DetailDocFormComponent', () => {
  let component: DetailDocFormComponent;
  let fixture: ComponentFixture<DetailDocFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDocFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
