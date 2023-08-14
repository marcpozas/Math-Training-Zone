import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './src/app/components/landing/landing.component';
import { TrainingFirstPhaseComponent } from './src/app/components/training-first-phase/training-first-phase.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'training', component: TrainingFirstPhaseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
