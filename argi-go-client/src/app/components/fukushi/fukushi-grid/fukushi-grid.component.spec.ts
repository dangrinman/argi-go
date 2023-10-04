import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FukushiGridComponent } from './fukushi-grid.component';

describe('FukushiGridComponent', () => {
  let component: FukushiGridComponent;
  let fixture: ComponentFixture<FukushiGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FukushiGridComponent]
    });
    fixture = TestBed.createComponent(FukushiGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
