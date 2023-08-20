import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { Operation } from '../models/Operation';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoseComponent } from './dialogs/lose/lose.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { DataService } from '../services/data.service';
import { OperationDataset } from '../models/OperationDataset';
import { VolumeControlService } from '../services/volume-control.service';

@Component({
  selector: 'app-training-first-phase',
  templateUrl: './training-first-phase.component.html',
  styleUrls: ['./training-first-phase.component.scss']
})
export class TrainingFirstPhaseComponent {
  @ViewChild('operationInput') operationInput!: ElementRef;
  @ViewChild('submitButton') submitButton!: ElementRef;
  @ViewChild('heartBar') heartBar!: ElementRef;

  lives = {initial: 0, actual: 0};
  actualTime: number = 60;
  initialTime: number = 60;
  actualOperation: Operation = {
    operation: "",
    solution: "",
    difficulty: ""
  }
  dataset: OperationDataset[] = [];
  completedOperations: Operation[] = [];
  actualDifficultyLevel: string = '';
  operationTypes = [];
  timeBarWidth = 100;
  isLose: boolean = false;
  interval: any;
  isLoading: boolean = true;

  constructor(private renderer: Renderer2,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private settingsService: SettingsService,
              private dataService: DataService,
              private router: Router,
              private volumeControlService: VolumeControlService) {}

  ngOnInit() {
    this.actualDifficultyLevel = this.settingsService.getDifficulty;
    this.dataService.getSubset(this.actualDifficultyLevel).subscribe(data => {
      this.dataset = data;
      this.operationTypes = this.settingsService.getOperations;
      this.dataset = this.getSmallSubset()
      this.lives.initial = this.lives.actual = this.settingsService.getLives;

      this.setNewOperation();

      this.interval = setInterval(() => {
        if (!this.isLose) {
          this.decreaseTimeBar();
        } else {
          clearInterval(this.interval); // Clear the interval when isLose is true
        }
      }, 1000);
    });

    // // Add a timeout before setting isLoading to false
    // setTimeout(() => {
    this.isLoading = false;
    // }, 50000); // 5 seconds timeout
  }

  ngAfterViewInit() {
    this.renderer.selectRootElement(this.operationInput.nativeElement).focus();
  }

  public range(number: number): number[] {
    return Array.from({ length: number }, (_, i) => i);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.lives.actual > 0) {
      const inputValue = this.operationInput.nativeElement.value;
      this.operationInput.nativeElement.value = '';
      this.onAnswer(inputValue);
    }
  }

  public onAnswer(inputValue: string): void {
    this.solveOperation(inputValue);
  }

  // public solveOperation(inputValue: string) {

  //   if (inputValue.replace(',', '.') != this.actualOperation.solution && !this.isLose         && false) {
  //     this.onWrongAnswer();
  //   } else if (inputValue.replace(',', '.') == this.actualOperation.solution && !this.isLose         || true){
  //     this.onCorrectAnswer();
  //   }
  // }

  public solveOperation(inputValue: string) {

    if (inputValue.replace(',', '.') != this.actualOperation.solution && !this.isLose) {
      this.onWrongAnswer();
    } else if (inputValue.replace(',', '.') == this.actualOperation.solution && !this.isLose){
      this.onCorrectAnswer();
    }
  }

  public onCorrectAnswer() {
    const correctSound = new Audio('assets/sounds/correct_sound.mp3');
    correctSound.volume = this.volumeControlService.getSoundVolume();
    correctSound.play();
    this.correctAnimation();
    let actualTimeToAdd = Math.round(5 * (1 - 1 / (1 + Math.exp(-0.05 * (this.completedOperations.length - 1)))) * 2);
    this.addTime(actualTimeToAdd);
    this.completedOperations.push(this.actualOperation);
    this.setNewOperation();
  }

  public onWrongAnswer() {
    const wrongSound = new Audio('assets/sounds/oof_steve_wrong_sound.mp3');
    wrongSound.volume = this.volumeControlService.getSoundVolume();
    wrongSound.play();
    this.lives.actual -= 1;
    this.hitAnimation()
    this.setNewOperation();
    
    const heartIcons = this.heartBar.nativeElement.querySelectorAll('svg');
    for (let index = this.lives.actual; index < this.lives.initial; index++) {
      heartIcons[index].style.fill = '#00000036';
    }
      if (this.lives.actual === 0) {
      this.isLose = true;
      this.openLoseDialog();
    }
  }

  public async hitAnimation():Promise<void> {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.classList.add('hit-animation')
      await new Promise(resolve => setTimeout(resolve, 500));
      bodyElement.classList.remove('hit-animation');
    }
  }

  public async correctAnimation():Promise<void> {
    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.classList.add('correct-animation')
      await new Promise(resolve => setTimeout(resolve, 500));
      bodyElement.classList.remove('correct-animation');
    }
  }

  public addTime(seconds:number): void {
    this.actualTime = Math.min(seconds + this.actualTime, this.initialTime);
    this.timeBarWidth = 100*this.actualTime/this.initialTime
  }

  public openLoseDialog(): void {
    const data = {
      numberOperations: this.completedOperations.length,
      score: this.calculateScore()
    }
    const dialogConfig: MatDialogConfig = {
      data: data,
      autoFocus: false,
      width: '60rem',
      height: '40rem',
      disableClose: true,
    };
    const dialogRef: MatDialogRef<LoseComponent> = this.dialog.open(LoseComponent, dialogConfig);
    let dialogResult = "";
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'reload') {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate(['./'], {
          relativeTo: this.route,
          skipLocationChange: true
        })
      }
    });
  }

  public decreaseTimeBar(): void {
    const decreaseAmount = 100 / this.initialTime;
    this.timeBarWidth -= decreaseAmount;
    this.timeBarWidth = Math.max(this.timeBarWidth, 0)
    this.actualTime -= 1;

    if (this.timeBarWidth === 0) {
      this.isLose = true;
      this.openLoseDialog();
    }
  }

  public async setNewOperation() {
    let randomOperation: OperationDataset = {
      operation: "",
      solution: "",
      difficulty: "",
      signs: [],
      numbers: []
    }
    randomOperation = this.dataset[Math.floor(Math.random() * this.dataset.length)];
    if (randomOperation.signs.includes('sqrt')) {
      randomOperation.operation = "√" + randomOperation.operation.split(" ")[1];
    } else if (randomOperation.signs.includes('**')) {
      randomOperation.operation = randomOperation.operation.replace("**", "^");
    }
    this.actualOperation = {
      operation: randomOperation.operation,
      solution: randomOperation.solution,
      difficulty: randomOperation.difficulty
    }
  }

  public calculateScore(): number {
    let score: number = 0;
    for (const solvedOperation of this.completedOperations) {
      score += Math.pow(parseFloat(solvedOperation.difficulty), 2) * 1000;
    }
    return score;
  }

  public getSmallSubset(): OperationDataset[] {
    let newDataset: OperationDataset[] = [];
    const operationSymbolMap: { [key: string]: string[] } = {
      'Addition': ['+'],
      'Substraction': ['-'],
      'Multiplication': ['*'],
      'Division': ['/','/.'],
      'Root': ['sqrt'],
      'Exponentiation': ['**'],
    };
    const operationSymbols = this.operationTypes.flatMap(name => operationSymbolMap[name]);
    let actualDataset: { [key: string]: OperationDataset[] } = {};
    for (const symbol of operationSymbols) {
      actualDataset[symbol] = [];
    }
    for (let operation of this.dataset) {
      try {
        actualDataset[operation.signs[0]].push(operation);
      } catch (error) {
        // console.log(actualDataset);
        // console.log(operation);
        // console.log(error);
      }
    }
    operationSymbols.forEach(sign => {
      let signDataset: OperationDataset[] = [];
      try {
        if (actualDataset[sign].length > 100) {
          while (signDataset.length < 100) {
            signDataset.push(actualDataset[sign][Math.floor(Math.random() * actualDataset[sign].length)]);
          }
        } else {
          signDataset = actualDataset[sign];
        }
      } catch (error) {
        actualDataset[sign] = []
      }
      newDataset = [...newDataset, ...signDataset];
    });
    return newDataset;
  }
}