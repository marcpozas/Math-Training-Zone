import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingFirstPhaseComponent } from './training-first-phase.component';

describe('TrainingFirstPhaseComponent', () => {
  let component: TrainingFirstPhaseComponent;
  let fixture: ComponentFixture<TrainingFirstPhaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingFirstPhaseComponent]
    });
    fixture = TestBed.createComponent(TrainingFirstPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
