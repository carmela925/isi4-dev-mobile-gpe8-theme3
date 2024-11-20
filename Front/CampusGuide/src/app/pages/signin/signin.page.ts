import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonText, IonButton, IonInput, IonItem, IonList, IonLabel, IonCheckbox } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonCheckbox, 
    IonLabel, 
    IonList, 
    IonItem, 
    IonInput, 
    IonButton, 
    IonText, 
    IonImg, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    CommonModule, 
    FormsModule, 
    RouterModule
  ]
})
export class SigninPage implements OnInit {
  logo = environment.logo;
  formVisible:boolean = false;
  constructor() { }

  ngOnInit() {
    console.log("hey");
  }

  showForm(){
    this.formVisible = true;
  }
  hideForm(){
    this.formVisible = false;
  }
}
