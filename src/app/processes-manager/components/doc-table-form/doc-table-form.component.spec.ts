import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTableFormComponent } from './doc-table-form.component';

describe('DocTableFormComponent', () => {
  let component: DocTableFormComponent;
  let fixture: ComponentFixture<DocTableFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTableFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
