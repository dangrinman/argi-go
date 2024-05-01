import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKotobaComponent } from './create-kotoba.component';

describe('CreateKotobaComponent', () => {
  let component: CreateKotobaComponent;
  let fixture: ComponentFixture<CreateKotobaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateKotobaComponent]
    });
    fixture = TestBed.createComponent(CreateKotobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
