import { Component, OnInit } from '@angular/core';
import { IonContent, IonActionSheet, IonButton, IonInput, IonTab, IonTabBar, IonTabButton, IonIcon, IonTabs, IonButtons, IonSearchbar, IonList, IonItem, IonLabel, IonSkeletonText, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { MenuModule } from "../components/menu/menu.module";
import { PreferencesService } from '../services/preferences.service';
import { AuthService } from '../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { bookmark, bookmarkOutline, downloadOutline } from 'ionicons/icons';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonButton,IonIcon,IonSkeletonText, IonLabel, IonItem, IonList, IonSearchbar, IonContent, DragDropModule, CommonModule, MenuModule],
})
export class HomePage implements OnInit {
  show: boolean = false;
  user: any;
  isLoading: boolean = true;  // Add a loading flag
  recentQuestions: any[] = [];

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

  constructor(
    private preferenceService: PreferencesService,
    private authService : AuthService,
    private auth: Auth,
    private router: Router,
    private questionService: QuestionsService
  ) {
      addIcons({
        bookmarkOutline,
        bookmark,
        downloadOutline
      })
    }

  ngOnInit() {
    // Fetch the user data when the component is initialized
    // this.preferenceService.get('user').then(user => {
    //   this.user = user;
    //   this.isLoading = false;  // Set loading to false when the user is loaded
    //   console.log(this.user);  // Now it should log the user object
    // }).catch(error => {
    //   console.error('Error retrieving user:', error);
    //   this.isLoading = false;  // Stop loading in case of error
    // });

    const user = this.auth.currentUser;
    console.log(user);
    if (user) {
      this.authService.getUserData(user.uid).then(userData => {
        console.log(userData);
        this.user = userData;
        console.log(userData)
        this.getRecents();
      }).catch(err => {
        console.error('Error fetching user data:', err);
        this.isLoading = false;
      });
    } else {
      console.error('No user is currently logged in.');
      this.isLoading = false;
    }
  }

  navigateToQuestionForm() {
    this.router.navigate(['/question-form']);
  }

  showMenu() {
    this.show = true;
    console.log('showMenu');
  }

  receivedState(state: boolean) {
    this.show = state;
  }

  getRecents(){
    let createdBy;
    if (this.user.role === "teacher") {
      createdBy = this.user.name
    }
    this.questionService.getRecentQuestions(5,createdBy).subscribe(
      (data:any) => {
        this.recentQuestions = data.questions;
        this.isLoading = false;  // Once data is loaded, set loading to false
        console.log(this.recentQuestions)
      },
      (error) => {
        this.isLoading = false;  // Once data is loaded, set loading to false
        console.error('Error fetching recent questions:', error);
      }
    )
  }
}
