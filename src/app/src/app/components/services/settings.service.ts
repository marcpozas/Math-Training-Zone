import { Injectable } from '@angular/core';
import { DifficultyLevel } from '../models/DifficultyLevel';
import { Operation } from '../models/Operation';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _operations: any;
  private _difficulty: string = 'easy';
  private _lives: number = 3;

  get getOperations(): any {
    return this._operations;
  }

  set setOperations(value: any) {
    this._operations = value;
  }

  get getDifficulty(): string {
    return this._difficulty;
  }

  set setDifficulty(value: string) {
    this._difficulty = value;
  }

  get getLives(): number {
    return this._lives;
  }

  set setLives(value: number) {
    this._lives = value;
  }
}
