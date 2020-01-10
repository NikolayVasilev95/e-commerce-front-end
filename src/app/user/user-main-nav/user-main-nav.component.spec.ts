/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserMainNavComponent } from './user-main-nav.component';

describe('UserMainNavComponent', () => {
  let component: UserMainNavComponent;
  let fixture: ComponentFixture<UserMainNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMainNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
