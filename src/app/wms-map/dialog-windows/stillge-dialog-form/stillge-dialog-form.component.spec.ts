import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StillgeDialogFormComponent } from './stillge-dialog-form.component';

describe('StillgeDialogFormComponent', () => {
  let component: StillgeDialogFormComponent;
  let fixture: ComponentFixture<StillgeDialogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StillgeDialogFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StillgeDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
