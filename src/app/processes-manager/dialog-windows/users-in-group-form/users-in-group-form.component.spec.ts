import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInGroupFormComponent } from './users-in-group-form.component';

describe('UsersInGroupFormComponent', () => {
  let component: UsersInGroupFormComponent;
  let fixture: ComponentFixture<UsersInGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersInGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersInGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
