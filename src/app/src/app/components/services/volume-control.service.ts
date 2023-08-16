import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumeControlService {
  private musicVolumeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1.0); // Initial volume value is 100
  private soundVolumeSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1.0); // Initial volume value is 100
  public musicVolume$: Observable<number> = this.musicVolumeSubject.asObservable();
  public soundVolume$: Observable<number> = this.soundVolumeSubject.asObservable();

  setSoundVolume(volume: number): void {
    this.soundVolumeSubject.next(volume);
  }

  getSoundVolume(): number {
    return this.soundVolumeSubject.value;
  }

  setMusicVolume(volume: number): void {
    this.musicVolumeSubject.next(volume);
  }

  getMusicVolume(): number {
    return this.musicVolumeSubject.value;
  }
}
