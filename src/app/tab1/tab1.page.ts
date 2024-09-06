import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonListHeader, IonButton } from '@ionic/angular/standalone';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonButton, IonListHeader, IonCol, IonRow, IonGrid, IonIcon, IonFabButton, IonFab, IonLabel, IonItem, 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
  ],
})
export class Tab1Page {
  databaseService = inject(DatabaseService);

  users = this.databaseService.getUsers();

}
