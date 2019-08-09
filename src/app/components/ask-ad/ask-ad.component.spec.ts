import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskAdComponent } from './ask-ad.component';

describe('AskAdComponent', () => {
  let component: AskAdComponent;
  let fixture: ComponentFixture<AskAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskAdComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
