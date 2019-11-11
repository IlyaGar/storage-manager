import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcPersonalListFormComponent } from './proc-personal-list-form.component';

describe('ProcPersonalListFormComponent', () => {
  let component: ProcPersonalListFormComponent;
  let fixture: ComponentFixture<ProcPersonalListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcPersonalListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcPersonalListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
