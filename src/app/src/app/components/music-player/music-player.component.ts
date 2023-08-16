import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SettingsComponent } from './dialogs/settings/settings.component';
import { VolumeControlService } from '../services/volume-control.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent {

  paused: boolean = true;
  musicMuted: boolean = false;
  lastMusicVolume: number = 1.0;
  soundMuted: boolean = false;
  music: string[] = [
    'Antonio Vivaldi - Winter (Full) - The Four Seasons.mp3',
    'Beethoven - Coriolan Overture (Karajan & Berliner Philharmoniker).mp3',
    'Beethoven - Piano Sonata No. 14 in C-Sharp Minor, ＂Moonlight＂： I. Adagio sostenuto - Earl Wild.mp3',
    'Camille Saint-Saëns - Danse Macabre.mp3',
    "Chopin - Nocturne in C sharp minor 'Lento con gran espressione', B. 49 (Op. posth.).mp3",
    'Mozart - Lacrimosa.mp3',
    'Nocturne in B flat minor, Op. 9 no. 1.mp3',
    'Prokofiev - Dance of the Knights.mp3',
    'Saint-Saens ： The Swan ( Le Cygne )  - Carnival of the Animals.mp3',
    "Tartini Violin Sonata in G minor ''Devil's Trill Sonata''.mp3",
    'Tchaikovsky - Swan Lake Op. 20, Act II No. 10, Scene.mp3',
    'Tchaikovsky - Valse Sentimentale.mp3'
  ];
  currentMusic: any;
  currentMusicString: string = '';
  // currentVolume: string = '0.1';


  constructor(private dialog: MatDialog,
              private volumeControlService: VolumeControlService) { }

  ngOnInit(): void {
    this.currentMusic = new Audio(`assets/music/${this.music[0]}`);
    this.currentMusicString = this.music[0];
    // this.currentMusic.volume = this.currentVolume;
    // this.currentMusic.volume = this.volumeControlService.getMusicVolume();
    // Subscribe to music volume changes
    this.volumeControlService.musicVolume$.subscribe(newVolume => {
      this.currentMusic.volume = this.volumeControlService.getMusicVolume();
    });
  }

  public shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray;
  }

  public onPlayPauseButton(event: any) {
    console.log(event);
    this.paused = !this.paused;
    if (!this.paused) {
      this.currentMusic.play();
    } else {
      this.currentMusic.pause();
    }
  }

  public onForwardButton(event: any) {
    this.currentMusic.pause();
    let currentIndex = this.music.indexOf(this.currentMusicString);
    console.log("current: " + this.music[currentIndex]);
    if (currentIndex < this.music.length-1) {
      console.log("next: " + this.music[currentIndex + 1]);
      this.currentMusicString = this.music[currentIndex + 1];
      this.currentMusic = new Audio(`assets/music/${this.music[currentIndex + 1]}`);
    } else {
      console.log("next: " + this.music[0]);
      this.currentMusicString = this.music[0];
      this.currentMusic = new Audio(`assets/music/${this.music[0]}`);
    }
    this.currentMusic.volume = this.volumeControlService.getMusicVolume();
    this.currentMusic.play();
  }

  public onBackButton(event: any) {
    this.currentMusic.pause();
    let currentIndex = this.music.indexOf(this.currentMusicString);
    console.log("current: " + this.music[currentIndex]);
    if (currentIndex > 0) {
      console.log("previous: " + this.music[currentIndex - 1]);
      this.currentMusicString = this.music[currentIndex - 1];
      this.currentMusic = new Audio(`assets/music/${this.music[currentIndex - 1]}`);
    } else {
      console.log("previous: " + this.music[this.music.length-1]);
      this.currentMusicString = this.music[this.music.length-1];
      this.currentMusic = new Audio(`assets/music/${this.music[this.music.length-1]}`);
    }
    this.currentMusic.volume = this.volumeControlService.getMusicVolume();
    this.currentMusic.play();
  }

  // public onMusicButton(event: any) {
  //   this.musicMuted = !this.musicMuted;
  //   if (this.musicMuted) {
  //     this.lastMusicVolume = this.currentMusic.volume;
  //     this.currentMusic.volume = 0.0;
  //   } else {
  //     this.currentMusic.volume = this.lastMusicVolume;
  //   }
  // }

  public onSoundButton(event: any) {
    this.soundMuted = !this.soundMuted;
  }

  removeSuffix(songName: string): string {
    return songName.replace('.mp3', '');
  }

  public openSettingsDialog():void {

    const data = {
    }
    const dialogConfig: MatDialogConfig = {
      data: data,
      autoFocus: false,
      width: '25rem',
      height: '13rem',
      disableClose: false,
      hasBackdrop: true,
      panelClass: 'settings-dialog'
    };
    const dialogRef: MatDialogRef<SettingsComponent> = this.dialog.open(SettingsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });

  }
}