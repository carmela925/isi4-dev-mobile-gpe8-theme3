import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonImg, IonLabel, IonItem, IonText, IonIcon } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonIcon, IonText, IonItem, IonLabel, IonImg, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  logo = environment.logo;
loginForm: any;
  constructor() { }

  ngOnInit() {
    console.log("hey");
  }

}
