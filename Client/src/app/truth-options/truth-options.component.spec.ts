import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruthOptionsComponent } from './truth-options.component';

describe('TruthOptionsComponent', () => {
  let component: TruthOptionsComponent;
  let fixture: ComponentFixture<TruthOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruthOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruthOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
