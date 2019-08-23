import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestsPage } from './quests.page';

describe('QuestsPage', () => {
  let component: QuestsPage;
  let fixture: ComponentFixture<QuestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
