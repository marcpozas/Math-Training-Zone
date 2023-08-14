import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent {

  paused: boolean = true;
  musicMuted: boolean = false;
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.music = this.shuffleArray(this.music)
    this.currentMusic = new Audio(`assets/music/${this.music[0]}`);
    this.currentMusic.volume = '0.1';

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
    
  }

  public onBackButton(event: any) {
    console.log(event.target);
  }

  public onMusicButton(event: any) {
    this.musicMuted = !this.musicMuted;
  }

  public onSoundButton(event: any) {
    this.soundMuted = !this.soundMuted;
    
  }

}
