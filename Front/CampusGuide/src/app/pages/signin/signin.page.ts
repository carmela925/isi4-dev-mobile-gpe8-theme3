import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonText, IonButton, IonInput, IonItem, IonList, IonLabel, IonCheckbox, IonIcon } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [
    IonIcon, 
    IonCheckbox, 
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
    const form = document.querySelector('.form-shape') as HTMLElement;
    if (form.classList.contains('hide')) {
      form.classList.remove('hide');
    }
  }
  hideForm(){
    const form = document.querySelector('.form-shape') as HTMLElement;
    form.classList.add('hide');
    setTimeout(() => {
      this.formVisible = false;
    },3000)
  }
}
