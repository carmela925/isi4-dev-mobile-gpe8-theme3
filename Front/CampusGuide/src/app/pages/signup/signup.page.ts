import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonImg, IonInput, LoadingController, IonBackdrop, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonItem, IonBackdrop, IonInput, IonImg, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class SignupPage implements OnInit {
  logo = environment.logo;
  regForm !: FormGroup;
  role: string = 'student'; // Default role is 'student'
  isLoading = false;

  constructor(private formBuilder:FormBuilder,
    private authService : AuthService,
    private router: Router,
    private preferencesService: PreferencesService
  ) { }

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
        Validators.pattern('^(?=.*[a-zA-Z0-9]).{6,}$'),
        Validators.required,
      ],
    ]
    });
  }

  get errorControl() {
    return this.regForm?.controls;
  }

  register() {
    this.isLoading = true;
    // Trim and validate email
    this.regForm.value.email = this.regForm.value.email.trim();
    if (!this.isValidEmail(this.regForm.value.email)) {
      console.error('Invalid email address.');
      alert('Please enter a valid email address.');
      this.isLoading = false;
      return;
    }

    // Ensure password is provided
    if (!this.regForm.value.password || this.regForm.value.password.length < 6) {
      console.error('Password must be at least 6 characters long.');
      alert('Password must be at least 6 characters.');
      this.isLoading = false;
      return;
    }

    // Call AuthService to handle Firebase signup
    this.authService.signUp(this.regForm.value.email, this.regForm.value.password, this.regForm.value.name)
    .then((userCredential) => {
      console.log('Sign up successful!');

    // Get the Firebase user object
    const user = userCredential.user;

    // Now send the user's data (uid, email, displayName) to the backend
    if (user) {
      this.authService.registerUser(user.uid, this.regForm.value.email, this.regForm.value.name)
        .subscribe(
          (response) => {
            console.log('User registered successfully in Firestore:', response);
            this.saveUser(response);
          },
          (error) => {
            console.error('Error registering user in Firestore:', error);
            this.isLoading = false;
            alert('Error registering user in Firestore.');
          }
        );
    }
  })
  .catch((error) => {
    console.error('Error during sign up:', error);
    this.isLoading = false;
    alert('Error during sign up. Please try again.');
  });
  }

  // Email validation function
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async saveUser(user: any){
    if ((!user.level || !user.field) && user.role!=="teacher") {
      this.isLoading = false;
      this.router.navigate(['/next',user.uid]);
    } else {
      try {
        await this.preferencesService.set("user",user);
        console.log("saved user",user)
        this.isLoading = false;
        this.router.navigate(['/home']);
      } catch (error) {
        console.log(error);
        this.isLoading = false;
        this.router.navigate(['/home']);
      }
    }
  }
}
