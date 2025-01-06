import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonItem, IonBackdrop, IonSpinner, IonSkeletonText } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { HeaderModule } from "../../components/header/header/header.module";
import { MenuModule } from "../../components/menu/menu.module";
import { QuestionsService } from 'src/app/services/questions.service';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/services/subject.service';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-pastquestions',
  templateUrl: './pastquestions.page.html',
  styleUrls: ['./pastquestions.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonContent,CommonModule, FormsModule, RouterModule, HeaderModule, MenuModule]
})
export class PastquestionsPage implements OnInit{
  hasLoaded = false;
  subjects: Subject[] = [];
  subjectsIcons = new Map<string, string>();
  user: any;
  subjectId: string = '';
  title: string = '';
  description: string = '';
  pdfUrl: string = ''; // PDF URL for the question (if applicable)

  constructor(
    private questionService: QuestionsService,
    private subjectService: SubjectService,
    private preferenceService: PreferencesService
  ) {
    this.preferenceService.get('user').then(user => {
      this.user = user;
      console.log("from constrictor ",this.user);  // Now it should log the user object
    }).catch(error => {
      console.error('Error retrieving user:', error);
    })
  }

  ngOnInit(): void {
    this.preferenceService.get('user').then(user => {
      if(user){
        this.user = user;
        this.getAllUserSubjects();
      } else {
        console.log("No user saved");
        this.hasLoaded = true;
      }
      console.log(this.user);  // Now it should log the user object
    }).catch(error => {
      console.error('Error retrieving user:', error);
    })
  }

  addQuestion() {
    const question = {
      subjectId: this.subjectId,
      title: this.title,
      description: this.description,
      pdfUrl: this.pdfUrl,
    };

  //  this.questionService.addQuestion(question).then(() => {
  //     this.clearForm();
  //   });
  }

  clearForm() {
    this.subjectId = '';
    this.title = '';
    this.description = '';
    this.pdfUrl = '';
  }

  getAllUserSubjects(){
    this.subjectService.getAllSubjects().subscribe(
      (data) => {
        this.subjects = data.filter((subject: Subject) => subject.level===this.user.level);
        this.getIcons()
        console.log(this.subjects)
      },
      (error) => {
        this.hasLoaded = true;
        console.log("Couldn't fetch subjects")
      }
    )
  }

  getIcons(){
    this.subjectService.getSubjectsIconsByLevel(this.user.level).subscribe(
      (data) => {
        data[0].semesters[0].forEach((element: any) => {
          this.subjectsIcons.set(element.name, element.icon)
        });
        data[0].semesters[1].forEach((element: any) => {
          this.subjectsIcons.set(element.name, element.icon)
        });
        this.hasLoaded = true;
        console.log(this.subjectsIcons)
      },
      (error) => {
        this.hasLoaded = true;
        console.log("Couldn't fetch subjects icons")
      }
    )
  }

}
