import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SQLiteService } from './sqlite.service';

import { Platform } from '@ionic/angular';

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

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  // private sqlite = inject(SQLiteService)
  private db!: SQLiteDBConnection;
  private user = signal<User[]>([]);

  isWeb = false;
  private initPlugin!: boolean;
  constructor(private platform: Platform, private sqlite: SQLiteService) {}

  async initializeApp() {
    console.log('initializeApp');
    let isWeb = false;
    await this.platform.ready();

    const ret = await this.sqlite.initializePlugin();

    this.initPlugin = ret;
    if (this.sqlite.platform === 'web') {
      isWeb = true;
      await customElements.whenDefined('jeep-sqlite');
      const jeepSqliteEl = document.querySelector('jeep-sqlite');
      if (jeepSqliteEl != null) {
        await this.sqlite.initWebStore();
        console.log(`>>>> isStoreOpen ${await jeepSqliteEl.isStoreOpen()}`);
      } else {
        console.log('>>>> jeepSqliteEl is null');
      }
    }

    console.log(`>>>> in App  this.initPlugin ${this.initPlugin}`);

    console.log('initializeApp end');

    return isWeb;
  }

  async init(): Promise<void> {
    console.log('init');
    this.db = await this.sqlite.createConnection(
      BD_USERS,
      false,
      'no-encryption',
      1
    );

    console.log(this.db);

    await this.db.open();

    const query =
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT);';

    await this.db.execute(query);
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    const query = 'SELECT * FROM users;';
    const result = await this.db.query(query);

    const resultValus = result.values || [];

    this.user.set(resultValus);
  }

  getUsers(): WritableSignal<User[]> {
    return this.user;
  }

  async addUser(user: UserDto): Promise<void> {
    const query = `INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}');`;
    await this.db.execute(query);
    this.loadUsers();
  }

  async deleteUser(id: number): Promise<void> {
    const query = `DELETE FROM users WHERE id = ${id};`;
    await this.db.execute(query);
    this.loadUsers();
  }

  async updateUser(user: User): Promise<void> {
    const query = `UPDATE users SET name = '${user.name}', email = '${user.email}', password = '${user.password}' WHERE id = ${user.id};`;
    await this.db.execute(query);
    this.loadUsers();
  }

  async login(email: string, password: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`;
    const result = await this.db.query(query);

    const resultValus = result.values || [];

    if (resultValus.length === 0) {
      return null;
    }

    const user = resultValus[0];

    this.loadUsers();


    return {
      ...user
    };
  }
}
