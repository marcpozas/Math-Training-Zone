import { Component } from '@angular/core';
import { VolumeControlService } from '../../../services/volume-control.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  musicVolume: number = 0;
  soundVolume: number = 0;

  constructor(private volumeControlService: VolumeControlService) {  }

  ngOnInit(): void {
    this.musicVolume = this.volumeControlService.getMusicVolume()*100;
    this.soundVolume = this.volumeControlService.getSoundVolume()*100;
    console.log(this.musicVolume);
  }

  public onMusicSliderChange(event: any): void {
    this.musicVolume = event.target.value;
    this.volumeControlService.setMusicVolume(event.target.value/100);
  }

  public onSoundSliderChange(event: any): void {
    this.soundVolume = event.target.value;
    this.volumeControlService.setSoundVolume(event.target.value/100);
  }
}
