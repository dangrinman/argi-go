import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeishiGridComponent } from './meishi-grid.component';

describe('MeishiGridComponent', () => {
  let component: MeishiGridComponent;
  let fixture: ComponentFixture<MeishiGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MeishiGridComponent]
    });
    fixture = TestBed.createComponent(MeishiGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
