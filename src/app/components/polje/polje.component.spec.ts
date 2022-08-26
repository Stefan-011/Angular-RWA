import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoljeComponent } from './polje.component';

describe('PoljeComponent', () => {
  let component: PoljeComponent;
  let fixture: ComponentFixture<PoljeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoljeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoljeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
