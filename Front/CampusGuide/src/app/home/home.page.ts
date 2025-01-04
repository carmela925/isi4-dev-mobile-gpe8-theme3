import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonActionSheet, IonButton, IonInput, IonTab, IonTabBar, IonTabButton, IonIcon, IonTabs, IonButtons, IonSearchbar, IonList, IonItem, IonLabel, IonSkeletonText } from '@ionic/angular/standalone';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { MenuModule } from "../components/menu/menu.module";
import { PreferencesService } from '../services/preferences.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonLabel, IonItem, IonList, IonSearchbar, IonButtons, IonTabs, IonIcon, IonTabButton, IonTabBar, IonTab, IonButton, IonActionSheet, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, DragDropModule, CommonModule, MenuModule],
})
export class HomePage {
  show: boolean = false;
  user: any;
  isLoading: boolean = true;  // Add a loading flag

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

  constructor(private preferenceService: PreferencesService) {}

  ngOnInit() {
    // Fetch the user data when the component is initialized
    this.preferenceService.get('user').then(user => {
      this.user = user;
      this.isLoading = false;  // Set loading to false when the user is loaded
      console.log(this.user);  // Now it should log the user object
    }).catch(error => {
      console.error('Error retrieving user:', error);
      this.isLoading = false;  // Stop loading in case of error
    });
  }

  showMenu() {
    this.show = true;
    console.log('showMenu');
  }

  receivedState(state: boolean) {
    this.show = state;
  }
}
