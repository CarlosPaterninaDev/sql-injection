import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Platform } from '@ionic/angular';

import { DatabaseService } from './services/database.service';
import { SQLiteService } from './services/sqlite.service';

const BD_USERS = 'myuserbd';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserDto {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SQLiteService],
})
export class AppComponent {
  isWeb = false;
  constructor(private databaseService: DatabaseService) {
    this.init();
  }

  async init(){
    await this.databaseService.initializeApp();
    await this.databaseService.init();

    await this.databaseService.addUser({
      name: 'Carlos Paternina',
      email: 'carlos@example.com',
      password: 'P@ssw0rd',
    });

    await this.databaseService.addUser({
      name: 'John Doe',
      email: 'jhon@example.com',
      password: 'H4rdP@ssw0rd',
    });

   await this.databaseService.addUser({
      name: 'User Example',
      email: 'user@example.com',
      password: '12345',
    });
  }
}
