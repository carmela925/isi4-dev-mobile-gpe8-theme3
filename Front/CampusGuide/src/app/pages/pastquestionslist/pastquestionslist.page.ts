import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonList, IonButton, IonIcon, IonButtons, IonSearchbar, IonBackButton } from '@ionic/angular/standalone';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-pastquestionslist',
  templateUrl: './pastquestionslist.page.html',
  styleUrls: ['./pastquestionslist.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonSearchbar, IonButtons, IonIcon, IonButton, IonList, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PastquestionslistPage implements OnInit {

  questions: any[] = [];
  subjectId: string = ''; // Used to filter questions by subject

  constructor(private questionService: QuestionsService) {}

  ngOnInit() {
    this.loadQuestions();
  }

  // Load all questions or by subject
  loadQuestions() {
    if (this.subjectId) {
      this.questionService.getQuestionsBySubject(this.subjectId).then((data: any) => {
        this.questions = data.questions || [];
      });
    } else {
      this.questionService.getAllQuestions().then((data: any) => {
        this.questions = data.questions || [];
      });
    }
  }

  // Delete a question
  deleteQuestion(questionId: string) {
    this.questionService.deleteQuestion(questionId).then(() => {
      this.loadQuestions(); // Reload the questions
    });
  }

}
