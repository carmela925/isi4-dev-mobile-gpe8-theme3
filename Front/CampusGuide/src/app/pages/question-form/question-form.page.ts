import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSkeletonText, IonItem, IonLabel, IonButton, IonNote } from '@ionic/angular/standalone';
import { HeaderModule } from "../../components/header/header/header.module";
import { QuestionsService } from 'src/app/services/questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.page.html',
  styleUrls: ['./question-form.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HeaderModule]
})
export class QuestionFormPage implements OnInit {

  selectedFile: File | null = null;
  questionForm!: FormGroup;
  user: any;


  constructor(private questionService : QuestionsService,
    private fb: FormBuilder,private router: Router,private auth: Auth,
    private route: ActivatedRoute,private authService : AuthService
  ) {
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      subjectName: ['', Validators.required],
      fileUrl: [''],
      createdBy: [''],
    });
  }

  ngOnInit() {
    this.loadUserName();
  }

  async loadUserName() {

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.selectedFile = input.files[0];
      //this.artistForm.patchValue({ imageUrl : this.selectedFile.name }); // Optional
    }
  }



  onSubmit(): void{

    if (!this.selectedFile) {
      alert('Please fill all fields and select a file.');
      return;
    }

    const user = this.auth.currentUser;
    if (user) {
      this.authService.getUserData(user.uid).then(userData => {
        this.user = userData;
        this.questionForm.value.createdBy = this.user.name;
        console.log(this.questionForm.value.createdBy);
      }).catch(err => {
        console.error('Error fetching user data:', err);
      });
    } else {
      console.error('No user is currently logged in.');
    }

    // const name =
    const formData = new FormData();
  formData.append('file', this.selectedFile);

  // First, upload the document (PDF or other) to the backend
  this.questionService.uploadDoc(formData).subscribe({
    next: (response) => {
      // If the file upload is successful, store the file URL in the form data
      this.questionForm.value.fileUrl = response.fileUrl;
      console.log(response.fileUrl);

      const link = "https://campusbackend-36og.onrender.com/uploads/"+response.publicId;
      console.log(link);

      // Now add the question with the file URL and other form data
      this.questionService.addQuestion(this.questionForm.value).subscribe({
        next: () => {
          alert('Question added successfully');
          // Optionally, reset the form or show a success message
          this.questionForm.reset();
          this.selectedFile = null; // Reset the file selection
        },
        error: (error) => {
          console.error('Error adding question:', error);
          alert('Error adding question');
        }
      });
    },
    error: (error) => {
      console.error('Upload failed:', error);
      alert('Error uploading document');
    }
  });
  }

}
