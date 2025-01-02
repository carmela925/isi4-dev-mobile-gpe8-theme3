import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonActionSheet, IonButton, IonInput, IonTab, IonTabBar, IonTabButton, IonIcon, IonTabs, IonButtons, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { MenuModule } from "../components/menu/menu.module";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonSearchbar, IonButtons, IonTabs, IonIcon, IonTabButton, IonTabBar, IonTab, IonButton, IonActionSheet, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, DragDropModule, CommonModule, MenuModule],
})
export class HomePage {
  show: boolean = false;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor() {}

  showMenu(){
    this.show = true;
    console.log("showMenu");
  }
  receivedState(state: boolean) {
    this.show = state;
  }
}
