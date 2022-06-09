import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuielComponent } from './accuiel.component';

describe('AccuielComponent', () => {
  let component: AccuielComponent;
  let fixture: ComponentFixture<AccuielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccuielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccuielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
