import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveAnswerComponent } from './give-answer.component';

describe('GiveAnswerComponent', () => {
  let component: GiveAnswerComponent;
  let fixture: ComponentFixture<GiveAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
