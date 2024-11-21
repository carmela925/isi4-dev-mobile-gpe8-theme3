import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonIcon, IonButtons, IonSearchbar, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pastquestionslist',
  templateUrl: './pastquestionslist.page.html',
  styleUrls: ['./pastquestionslist.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonSearchbar, IonButtons, IonIcon, IonButton, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PastquestionslistPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
