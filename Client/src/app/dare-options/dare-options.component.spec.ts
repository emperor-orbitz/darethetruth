import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DareOptionsComponent } from './dare-options.component';

describe('DareOptionsComponent', () => {
  let component: DareOptionsComponent;
  let fixture: ComponentFixture<DareOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DareOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DareOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
