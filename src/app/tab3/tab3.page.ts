import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonListHeader,
  IonLabel,
  IonGrid,
  IonText,
  IonIcon, IonButton } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { logoGithub } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonButton, 
    IonIcon,
    IonText,
    IonGrid,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonListHeader,
    IonLabel,
  ],
})
export class Tab3Page {
  constructor() {
    addIcons({logoGithub});
  }
}
