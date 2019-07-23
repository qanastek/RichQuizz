import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesPage } from './rules.page';

describe('RulesPage', () => {
  let component: RulesPage;
  let fixture: ComponentFixture<RulesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
