import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessWordsComponent } from './guess-words.component';

describe('GuessWordsComponent', () => {
  let component: GuessWordsComponent;
  let fixture: ComponentFixture<GuessWordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuessWordsComponent]
    });
    fixture = TestBed.createComponent(GuessWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
