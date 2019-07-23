import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsPage } from './levels.page';

describe('LevelsPage', () => {
  let component: LevelsPage;
  let fixture: ComponentFixture<LevelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
