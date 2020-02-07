import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUnloadingFormComponent } from './document-unloading-form.component';

describe('DocumentUnloadingFormComponent', () => {
  let component: DocumentUnloadingFormComponent;
  let fixture: ComponentFixture<DocumentUnloadingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentUnloadingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUnloadingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
