import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './src/app/components/landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingModule } from './src/app/components/landing/landing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { TrainingFirstPhaseComponent } from './src/app/components/training-first-phase/training-first-phase.component';
import { LoseComponent } from './src/app/components/training-first-phase/dialogs/lose/lose.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MusicPlayerComponent } from './src/app/components/music-player/music-player.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    TrainingFirstPhaseComponent,
    LoseComponent,
    MusicPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    LandingModule,
    MatSliderModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
