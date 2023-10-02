import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessKotobaComponent } from './guess-kotoba.component';

describe('GuessKotobaComponent', () => {
  let component: GuessKotobaComponent;
  let fixture: ComponentFixture<GuessKotobaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GuessKotobaComponent]
    });
    fixture = TestBed.createComponent(GuessKotobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
