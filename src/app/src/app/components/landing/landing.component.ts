import { Component, ElementRef, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { DifficultyLevel } from '../models/DifficultyLevel';
import { UserSettingsService } from '../services/user-settings-service.service';
import { UserConfiguration } from '../services/models/UserConfiguration';
import { VolumeControlService } from '../services/volume-control.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  difficultyLevel: DifficultyLevel[] = [
    {points: 0, level: 'easy', color: '#10631e'},
    {points: 25, level: 'medium', color: '#ffd79b'},
    {points: 50, level: 'hard', color: '#ff1900'},
    {points: 75, level: 'extreme', color: '#490081'},
  ];
  actualDifficultyLevel = 'easy';
  selectedValue: number | undefined;
  lives: number = 10;
  heartClasses: string[] = [];

  userConfig: UserConfiguration = {
    difficultyLevel: 'easy',
    lives: 10,
    operationTypes: ['Addition', 'Substraction', 'Multiplication', 'Division', 'Exponentiation', 'Root'],
    musicVolume: 100,
    soundVolume: 100
  };

  operations = [
    { name: 'Addition', checked: true },
    { name: 'Substraction', checked: true },
    { name: 'Multiplication', checked: true },
    { name: 'Division', checked: true },
    { name: 'Exponentiation', checked: true },
    { name: 'Root', checked: true },
  ];

  constructor(private renderer: Renderer2,
              private router: Router,
              private settingsService: SettingsService,
              private userSettingsService: UserSettingsService,
              private volumeControlService: VolumeControlService) {}

  ngOnInit(): void {
    const savedConfig = this.userSettingsService.getUserConfig();
    if (savedConfig) {
      this.userConfig = savedConfig;
    }
    console.log(this.userConfig);
    this.actualDifficultyLevel = this.userConfig["difficultyLevel"];
    this.lives = this.userConfig["lives"];
    const selectedOperations = this.userConfig["operationTypes"];
    this.operations.forEach(operation => {
      operation.checked = selectedOperations.includes(operation.name);
    });
    this.onSliderInit(this.difficultyLevel.filter((diff) => diff.level == this.actualDifficultyLevel)[0].points);
    this.volumeControlService.setMusicVolume(this.userConfig.musicVolume);
    this.volumeControlService.setSoundVolume(this.userConfig.soundVolume);
  }

  ngAfterViewInit() {
    this.onHeartInit();
  }

  onCheckboxChange(operation: any): void {
    operation.checked = !operation.checked;
  }

  public onSliderChange(event: any): void {
    const actual = this.difficultyLevel.find(level => level.points == event.target.value);
    if (actual) {
      this.actualDifficultyLevel = actual.level;
      this.changeSettingsColors(actual);
    }
  }

  public onSliderInit(value: number): void {
    console.log("fsd");
    const actual = this.difficultyLevel.find(level => level.points == value);
    console.log(actual);
    if (actual) {
      this.changeSettingsColors(actual);
    }
  }

  public onOperationCheck(operation: any): void {
    if (operation.checked && this.operations.filter((operation) => operation.checked == true).length > 1) {
      operation.checked = !operation.checked;
      
    } else if (!operation.checked) {
      operation.checked = !operation.checked;
      
    }
    // console.log(this.operations.filter((operation) => operation.checked == true).length);
    // if (this.operations.filter((operation) => operation.checked == true).length > 1) {
    //   operation.checked = !operation.checked;
    // }
  }

  public changeSettingsColors(level: DifficultyLevel): void {
    const titleElement = document.querySelector(".actual-difficulty");
    if (titleElement) {
      this.renderer.setStyle(titleElement, 'color', level.color);
    }
    const activeBarElement = document.querySelector(".mdc-slider__track--active_fill");
    if (activeBarElement) {
      this.renderer.setStyle(activeBarElement, 'border-color', level.color, RendererStyleFlags2.Important);
    }
    // const levelBar = document.querySelector(".options-difficulty");
    // if (levelBar) {      
    //   if (level.level == 'extreme') {
    //     levelBar.classList.add('shake')
    //   } else if (levelBar.classList.contains('shake')) {
    //     levelBar.classList.remove('shake')
    //   }
    // }
  }

  public range(number: number): number[] {
    return Array.from({ length: number }, (_, i) => i);
  }

  public onHeartClick(index: number): void {
    const clickedHeart = document.querySelector(`.heart-icon-${index}`) as SVGElement;
    if (clickedHeart) {
      if (clickedHeart.classList.contains('heart-on') && this.lives != 1) {
        this.lives -= 1;
        clickedHeart.classList.add('heart-off');
        clickedHeart.classList.remove('heart-on');
      } else if (clickedHeart.classList.contains('heart-off')) {
        this.lives += 1;
        clickedHeart.classList.add('heart-on');
        clickedHeart.classList.remove('heart-off');
      }
    }
  }

  public onHeartInit(): void {
    for (let index = 0; index < 10-this.lives; index++) {
      const heart = document.querySelector(`.heart-icon-${9-index}`) as SVGElement;
      console.log(index);
      console.log(heart);
      if (heart) {
        console.log(index);
        heart.classList.add('heart-off');
        heart.classList.remove('heart-on');
      }
      }
      // if (clickedHeart.classList.contains('heart-on') && this.lives != 1) {
      //   this.lives -= 1;
      // }
  }

  public navigateToTraining(): void {
    this.userSettingsService.saveUserConfig({
      difficultyLevel: this.actualDifficultyLevel,
      lives: this.lives,
      operationTypes: this.operations.filter((type) => type.checked === true ).map(type => type.name),
      musicVolume: this.volumeControlService.getMusicVolume(),
      soundVolume: this.volumeControlService.getSoundVolume()
    });
    this.settingsService.setOperations = this.operations.filter((type) => type.checked === true ).map(type => type.name);
    this.settingsService.setDifficulty = this.actualDifficultyLevel;
    this.settingsService.setLives = this.lives;
    this.router.navigate(["training"], {skipLocationChange: true});
  }

  public getDifficultyPoints(): number {
    return this.difficultyLevel.filter((diff) => diff.level == this.actualDifficultyLevel)[0].points;
  }
}
