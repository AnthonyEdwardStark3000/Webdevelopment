import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgshopComponent } from './ngshop.component';

describe('NgshopComponent', () => {
  let component: NgshopComponent;
  let fixture: ComponentFixture<NgshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
