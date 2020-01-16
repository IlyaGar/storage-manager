import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaStorageComponent } from './zona-storage.component';

describe('ZonaStorageComponent', () => {
  let component: ZonaStorageComponent;
  let fixture: ComponentFixture<ZonaStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
