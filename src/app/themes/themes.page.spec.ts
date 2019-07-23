import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesPage } from './themes.page';

describe('ThemesPage', () => {
  let component: ThemesPage;
  let fixture: ComponentFixture<ThemesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
