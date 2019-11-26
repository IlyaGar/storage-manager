import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBadgeFormComponent } from './print-badge-form.component';

describe('PrintBadgeFormComponent', () => {
  let component: PrintBadgeFormComponent;
  let fixture: ComponentFixture<PrintBadgeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintBadgeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBadgeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
