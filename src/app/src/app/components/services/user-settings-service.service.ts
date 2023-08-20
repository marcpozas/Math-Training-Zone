import { Injectable } from '@angular/core';
import { UserConfiguration } from './models/UserConfiguration';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  
  private userConfigKey = 'userConfig'; // Key for local storage

  constructor() { }

  saveUserConfig(config: UserConfiguration) {
    localStorage.setItem(this.userConfigKey, JSON.stringify(config));
  }

  getUserConfig(): UserConfiguration | null {
    const savedConfig = localStorage.getItem(this.userConfigKey);
    return savedConfig ? JSON.parse(savedConfig) : null;
  }
  
}
