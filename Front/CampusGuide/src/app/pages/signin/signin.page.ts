import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonText, IonButton } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonButton, IonText, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})
export class SigninPage implements OnInit {
  logo = environment.logo;
  constructor() { }

  ngOnInit() {
    console.log("hey");
  }

}
