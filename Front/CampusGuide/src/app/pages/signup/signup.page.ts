import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, IonImg, IonInput, LoadingController } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonInput, IonImg, IonButton, IonBackButton, IonButtons, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class SignupPage implements OnInit {
  logo = environment.logo;
  regForm !: FormGroup;
  role: string = 'student'; // Default role is 'student'

  constructor(private formBuilder:FormBuilder,
    private loadingController: LoadingController, 
    private authService : AuthService,
    private route: Router
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
    // this.authService.signup(this.regForm.value.email, this.regForm.value.password,this.regForm.value.name)
    // .subscribe(
    //   (response) => {
    //     console.log('User registered successfully', response);
    //     this.route.navigate(['next'],this.regForm.value.email);
    //   },
    //   (error) => {
    //     console.error('Error registering user', error);
    //   }
    // );
    this.route.navigate(['next',this.regForm.value.email]);
  }

  // Email validation function
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
