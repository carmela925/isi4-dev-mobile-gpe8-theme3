import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { HeaderModule } from "../../components/header/header/header.module";
import { MenuModule } from "../../components/menu/menu.module";
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-pastquestions',
  templateUrl: './pastquestions.page.html',
  styleUrls: ['./pastquestions.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, HeaderModule, MenuModule]
})
export class PastquestionsPage {

  subjectId: string = '';
  title: string = '';
  description: string = '';
  pdfUrl: string = ''; // PDF URL for the question (if applicable)

  constructor(private questionService: QuestionsService) {}

  addQuestion() {
    const question = {
      subjectId: this.subjectId,
      title: this.title,
      description: this.description,
      pdfUrl: this.pdfUrl,
    };

    this.questionService.addQuestion(question).then(() => {
      this.clearForm();
    });
  }

  clearForm() {
    this.subjectId = '';
    this.title = '';
    this.description = '';
    this.pdfUrl = '';
  }

}
