import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogFormComponent } from './error-log-form.component';

describe('ErrorLogFormComponent', () => {
  let component: ErrorLogFormComponent;
  let fixture: ComponentFixture<ErrorLogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorLogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
