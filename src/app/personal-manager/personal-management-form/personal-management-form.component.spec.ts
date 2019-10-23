import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalManagementFormComponent } from './personal-management-form.component';

describe('PersonalManagementFormComponent', () => {
  let component: PersonalManagementFormComponent;
  let fixture: ComponentFixture<PersonalManagementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalManagementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
