import { Component, inject, signal } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonLabel, IonButton, IonGrid, IonFab, IonFabButton, IonIcon, IonListHeader } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { addIcons } from 'ionicons';
import { sadOutline , list } from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonListHeader, IonIcon, IonFabButton, IonFab, IonGrid, IonButton, 
    IonItem,
    IonHeader,
    IonLabel,
    IonInput,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule

  ],
})
export class Tab2Page {

  databaseService = inject(DatabaseService);
  alert =  inject(AlertController);
  actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

  users = this.databaseService.getUsers();

  email!: string;
  password!: string;
  error = signal<string>('');
  showDatabase = signal<boolean>(false);

  constructor() {
    addIcons({ sadOutline, list });
  }


  login(){

    this.error.set('');

    this.databaseService.login(this.email, this.password).then((res) => {
      this.alert.create({
        header: 'Login',
        subHeader: `response: ${JSON.stringify(res)}`,
        message: res ? 'Login success' : 'Login failed',
        buttons: ['OK']
      }).then((alert) => {
        alert.present();
      });
    }, (err) => {
      this.error.set(err);
    });

  }

  async showList(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'SQL Injections',
      buttons: [
        {
          text: ' Bypass de Autenticación',
          data: {
            email: "jhon1@example.com' OR '1'=='1",
            password: '1',
          },
        },
        {
          text: 'Comentario para Anular la Consulta',
          data: {
            email: "jhon1@example.com' --",
            password: '1',
          },
        },
        {
          text: 'Modificar Datos',
          data: {
            email: "jhon1@example.com'; UPDATE users SET password='hacked' WHERE email='jhon1@example.com'; --",
            password: '1',
          },
        },
      ],
    });

    await actionSheet.present();

    const { data } = await actionSheet.onDidDismiss();

    console.log(data);
    this.email = data.email;
    this.password = data.password;
  }}
