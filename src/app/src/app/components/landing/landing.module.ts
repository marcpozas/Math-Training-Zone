import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [MatIconModule,
            MatSliderModule],
  exports: [RouterModule]
})
export class LandingModule { }
