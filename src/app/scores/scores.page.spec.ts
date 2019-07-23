import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresPage } from './scores.page';

describe('ScoresPage', () => {
  let component: ScoresPage;
  let fixture: ComponentFixture<ScoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
