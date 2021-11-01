import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfomanceComponent } from './perfomance.component';

describe('PerfomanceComponent', () => {
  let component: PerfomanceComponent;
  let fixture: ComponentFixture<PerfomanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfomanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfomanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
