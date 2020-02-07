import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUnloadingComponent } from './card-unloading.component';

describe('CardUnloadingComponent', () => {
  let component: CardUnloadingComponent;
  let fixture: ComponentFixture<CardUnloadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardUnloadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUnloadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
