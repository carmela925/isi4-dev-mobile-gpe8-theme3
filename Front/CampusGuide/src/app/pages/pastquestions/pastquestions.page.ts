import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { HeaderModule } from "../../components/header/header/header.module";
import { MenuModule } from "../../components/menu/menu.module";

@Component({
  selector: 'app-pastquestions',
  templateUrl: './pastquestions.page.html',
  styleUrls: ['./pastquestions.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, HeaderModule, MenuModule]
})
export class PastquestionsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
