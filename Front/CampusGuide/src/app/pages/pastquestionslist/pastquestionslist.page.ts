import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonIcon, IonButtons, IonSearchbar, IonBackButton, IonRefresher, IonRefresherContent, IonSkeletonText } from '@ionic/angular/standalone';
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { addIcons } from 'ionicons';
import { bookmark, bookmarkOutline, downloadOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pastquestionslist',
  templateUrl: './pastquestionslist.page.html',
  styleUrls: ['./pastquestionslist.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonRefresherContent, IonRefresher, IonBackButton, IonSearchbar, IonButtons, IonIcon, IonButton, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PastquestionslistPage implements OnInit {

  questions: any[] = [];
  subjectId: string = ''; // Used to filter questions by subject
  user: any = null;
  isLoading = false;

  constructor(
    private questionService: QuestionsService,
    private preferenceService: PreferencesService,
    private route: ActivatedRoute
  ) {
    addIcons({
      bookmarkOutline,
      bookmark,
      downloadOutline
    })
  }

  ngOnInit() {
    this.isLoading = true
    this.subjectId = this.route.snapshot.paramMap.get('id') || '';
    this.preferenceService.get('user').then(user => {
      this.user = user;
      this.loadQuestions();
    }).catch(error => {
      console.error('Error retrieving user:', error);
    });
  }

  // Load all questions or by subject
  loadQuestions(event?:any) {
    this.isLoading = true;
    if (this.subjectId && this.subjectId!=='teacher') {
      this.questionService.getQuestionsBySubject(this.subjectId).then((data: any) => {
        this.questions = data.questions || [];
        this.isLoading = false;
        event?.target.complete();
      });
    } 
    else if(this.subjectId === 'teacher') {
      this.questionService.getAllQuestions().then((data: any) => {
        this.questions = data.questions.filter(
          (question:any) => question.createdBy === this.user.name
        ) || [];
        this.isLoading = false;
        event?.target.complete();
      });
    }
  }

  // Delete a question
  deleteQuestion(questionId: string) {
    this.questionService.deleteQuestion(questionId).then(() => {
      this.isLoading = true;
      this.loadQuestions(); // Reload the questions
    });
  }

  refreshData(event: any) {
    this.isLoading = true;
    setTimeout(() => {
      this.loadQuestions(event);
    }, 1500); // Simulate API delay
  }
}
