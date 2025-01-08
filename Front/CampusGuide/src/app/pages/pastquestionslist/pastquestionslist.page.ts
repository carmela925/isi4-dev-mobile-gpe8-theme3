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
  recentToggle: boolean = false;
  oldestToggle: boolean = false;
  ascToggle: boolean = false;
  descToggle: boolean = false;
  searchTerm: string = '';
  filteredQuestions: any[] = [];
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
        this.filteredQuestions = [...this.questions];
        this.isLoading = false;
        event?.target.complete();
      });
    } 
    else if(this.subjectId === 'teacher') {
      this.questionService.getAllQuestions().then((data: any) => {
        this.questions = data.questions.filter(
          (question:any) => question.createdBy === this.user.name
        ) || [];
        this.filteredQuestions = [...this.questions];
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

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.filteredQuestions = this.questions;  // Show all questions if search is empty
    } else {
      this.filteredQuestions = this.questions.filter((question) => 
        question.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        question.createdBy.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  sortByNameAsc() {
    this.ascToggle = !this.ascToggle;
    this.descToggle = false;
    if (this.ascToggle) {
      this.filteredQuestions = [...this.filteredQuestions].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    } else {
      this.resetToggle();
    }
  }

  sortByNameDesc() {
    this.descToggle = !this.descToggle;
    this.ascToggle = false;
    if (this.descToggle) {
      this.filteredQuestions = [...this.filteredQuestions].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
    } else {
      this.resetToggle();
    }
  }

  sortByOldest() {
    this.oldestToggle = !this.oldestToggle;
    this.recentToggle = false;
    if (this.oldestToggle) {
      this.filteredQuestions = [...this.filteredQuestions].sort((a, b) => {
        const dateA = new Date(a.createdAt); // Convert createdAt string to Date object
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      });
    } else {
      this.resetToggle();
    }
  }

  sortByRecent() {
    this.recentToggle = !this.recentToggle;
    this.oldestToggle = false;
    if (this.recentToggle) {
      this.filteredQuestions = [...this.filteredQuestions].sort((a, b) => {
        const dateA = new Date(a.createdAt); // Convert createdAt string to Date object
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
      });
    } else {
      this.resetToggle();
    }
  }

  resetToggle(){
    this.filteredQuestions =[...this.questions];
    this.ascToggle = false;
    this.descToggle = false;
    this.recentToggle = false;
    this.oldestToggle = false;
  }
}
