import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonActionSheet, IonButton, IonInput, IonTab, IonTabBar, IonTabButton, IonIcon, IonTabs, IonButtons, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonSearchbar, IonButtons, IonTabs, IonIcon, IonTabButton, IonTabBar, IonTab, IonButton, IonActionSheet, IonHeader, IonToolbar, IonTitle, IonContent, IonInput,DragDropModule, CommonModule],
})
export class HomePage {
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

}
