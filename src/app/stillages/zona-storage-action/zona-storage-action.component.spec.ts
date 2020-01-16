import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaStorageActionComponent } from './zona-storage-action.component';

describe('ZonaStorageActionComponent', () => {
  let component: ZonaStorageActionComponent;
  let fixture: ComponentFixture<ZonaStorageActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaStorageActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaStorageActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
