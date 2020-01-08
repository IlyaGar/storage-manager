import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocFormComponent } from './list-doc-form.component';

describe('ListDocFormComponent', () => {
  let component: ListDocFormComponent;
  let fixture: ComponentFixture<ListDocFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDocFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDocFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
