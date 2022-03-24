import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigusersComponent } from './configusers.component';

describe('ConfigusersComponent', () => {
  let component: ConfigusersComponent;
  let fixture: ComponentFixture<ConfigusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
