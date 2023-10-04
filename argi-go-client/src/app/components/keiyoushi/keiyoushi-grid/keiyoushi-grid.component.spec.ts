import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeiyoushiGridComponent } from './keiyoushi-grid.component';

describe('KeiyoushiGridComponent', () => {
  let component: KeiyoushiGridComponent;
  let fixture: ComponentFixture<KeiyoushiGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [KeiyoushiGridComponent]
    });
    fixture = TestBed.createComponent(KeiyoushiGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
