import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonImg, IonLabel, IonItem, IonText, IonIcon, IonInput } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonLabel, IonImg, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
  logo = environment.logo;
  // loginForm = new FormGroup(
  //   email
  // );
  constructor() { }

  ngOnInit() {
    console.log("hey");
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }

}
