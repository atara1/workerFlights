import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerFlightsComponent } from './worker-flights.component';

describe('WorkerFlightsComponent', () => {
  let component: WorkerFlightsComponent;
  let fixture: ComponentFixture<WorkerFlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerFlightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
