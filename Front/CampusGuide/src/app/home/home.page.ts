import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonActionSheet, IonButton, IonInput, IonTab, IonTabBar, IonTabButton, IonIcon, IonTabs, IonButtons, IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonSearchbar, IonButtons, IonTabs, IonIcon, IonTabButton, IonTabBar, IonTab, IonButton, IonActionSheet, IonHeader, IonToolbar, IonTitle, IonContent, IonInput],
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

  logResult(ev:any) {
    console.log(JSON.stringify(ev.detail, null, 2));
  }
}
