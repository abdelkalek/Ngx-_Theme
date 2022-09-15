import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPointageComponent } from './list-pointage.component';

describe('ListPointageComponent', () => {
  let component: ListPointageComponent;
  let fixture: ComponentFixture<ListPointageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPointageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
