import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonImg, IonLabel, IonItem, IonText, IonIcon, IonInput, LoadingController } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonInput, IonItem, IonLabel, IonImg, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SignupPage implements OnInit {
  logo = environment.logo;
  // loginForm = new FormGroup(
  //   email
  regForm !: FormGroup;

  constructor(public formBuilder:FormBuilder,private loadingController: LoadingController, private authService : AuthService) { }

  ngOnInit() {
    console.log("hey");
    this.regForm = this.formBuilder.group({
      name : ['',[
          Validators.required,
      ]],
      email: ['',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.required,
      ],
    ]
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  register() {
    // Trim and validate email
    this.regForm.value.email = this.regForm.value.email.trim();
    if (!this.isValidEmail(this.regForm.value.email)) {
      console.error('Invalid email address.');
      alert('Please enter a valid email address.');
      return;
    }

    // Ensure password is provided
    if (!this.regForm.value.password || this.regForm.value.password.length < 6) {
      console.error('Password must be at least 6 characters long.');
      alert('Password must be at least 6 characters.');
      return;
    }

    // Call AuthService to handle Firebase signup
    this.authService.signUp(this.regForm.value.email, this.regForm.value.password,this.regForm.value.name)
      .then(user => {

        console.log('User signed up successfully:', user);
        alert('Signup successful!');
      })
      .catch(err => {
        console.error('Error during signup:', err.message);
        alert(err.message); // Show user-friendly error
      });
  }

  // Email validation function
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
