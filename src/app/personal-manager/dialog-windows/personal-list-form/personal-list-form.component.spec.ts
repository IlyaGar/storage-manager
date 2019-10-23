import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalListFormComponent } from './personal-list-form.component';

describe('PersonalListFormComponent', () => {
  let component: PersonalListFormComponent;
  let fixture: ComponentFixture<PersonalListFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalListFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
