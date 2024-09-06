import { Component, inject, signal } from '@angular/core';
import {
  AlertController,
  ActionSheetController,
  ToastController,
} from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonGrid,
  IonFab,
  IonFabButton,
  IonIcon,
  IonListHeader,
  IonToast,
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { addIcons } from 'ionicons';
import {
  server,
  list,
  lockClosedOutline,
  lockOpenOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonToast,
    IonListHeader,
    IonIcon,
    IonFabButton,
    IonFab,
    IonGrid,
    IonButton,
    IonItem,
    IonHeader,
    IonLabel,
    IonInput,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    ReactiveFormsModule,
    IonInputPasswordToggle,
  ],
})
export class Tab2Page {
  databaseService = inject(DatabaseService);
  toastController = inject(ToastController);
  alert = inject(AlertController);
  actionSheetCtrl: ActionSheetController = inject(ActionSheetController);

  users = this.databaseService.getUsers();
  isSecure = signal<boolean>(true);

  email!: string;
  password!: string;
  error = signal<string>('');
  showDatabase = signal<boolean>(true);

  form!: FormGroup;
  fb = inject(FormBuilder);

  constructor() {
    addIcons({ lockClosedOutline, lockOpenOutline, server, list });

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.form.valueChanges.subscribe((value) => {
      this.email = value.email.trim();
      this.password = value.password.trim();
    });
  }

  login() {
    if (this.form.invalid && this.isSecure()) {
      this.error.set('Invalid form');
      return;
    }

    this.error.set('');

    this.databaseService.login(this.email, this.password).then(
      (res) => {
        this.alert
          .create({
            header: 'Login',
            subHeader: `response: ${JSON.stringify(res)}`,
            message: res ? 'Login success' : 'Login failed',
            buttons: ['OK'],
          })
          .then((alert) => {
            alert.present();
          });
      },
      (err) => {
        this.error.set(err);
      }
    );
  }

  async showList() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'SQL Injections',
      buttons: [
        {
          text: ' Bypass de Autenticación',
          data: {
            email: "user@example.com' OR '1'=='1",
            password: '1',
          },
        },
        {
          text: 'Comentario para Anular la Consulta',
          data: {
            email: "user@example.com' --",
            password: '1',
          },
        },
        {
          text: 'Modificar Datos',
          data: {
            email:
              "user@example.com'; UPDATE users SET password='hacked' WHERE email='user@example.com'; --",
            password: '1',
          },
        },
      ],
    });

    await actionSheet.present();

    const { data } = await actionSheet.onDidDismiss();

    if (data) {
      if (this.isSecure()) {
        this.form.controls['email'].setValue(data.email);
        this.form.controls['password'].setValue(data.password);
      } else {
        this.email = data.email;
        this.password = data.password;
      }
    }
  }

  async changeSecure() {
    this.isSecure.set(!this.isSecure());

    const toast = await this.toastController.create({
      message: `Secure form mode ${this.isSecure() ? 'enabled' : 'disabled'}`,
      duration: 1500,
      position: 'top',
      color: this.isSecure() ? 'success' : 'danger',
    });

    await toast.present();
  }
}
