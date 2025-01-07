import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonText, IonButton, IonInput, IonItem, IonList, IonLabel, IonCheckbox, IonIcon, LoadingController, IonSpinner, IonBackdrop } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment.prod';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonBackdrop, IonSpinner,
    IonIcon,
    IonCheckbox,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    IonImg,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SigninPage implements OnInit {
  logo = environment.logo;
  formVisible:boolean = false;
  isLoading = false;
  LogForm !: FormGroup;

  constructor(
    public formBuilder:FormBuilder,
    private authService : AuthService,
    private preferencesService: PreferencesService,
    private router: Router) { }

  ngOnInit() {
    this.LogForm = this.formBuilder.group({
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


  showForm(){
    this.formVisible = true;
    const form = document.querySelector('.form-shape') as HTMLElement;
    if (form.classList.contains('hide')) {
      form.classList.remove('hide');
    }
  }
  hideForm(){
    const form = document.querySelector('.form-shape') as HTMLElement;
    form.classList.add('hide');
    setTimeout(() => {
      this.formVisible = false;
    },700)
  }


  Login() {
    this.isLoading = true;
    // Trim and validate email
    this.LogForm.value.email = this.LogForm.value.email.trim();
    this.LogForm.value.password = this.LogForm.value.password.trim();

    if (!this.LogForm?.value.email) {
      alert('Email is required.');
      return;
    }

    if (!this.isValidEmail(this.LogForm.value.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!this.LogForm?.value.password) {
      alert('Please enter your password.');
      return;
    }

    // Call AuthService to handle Firebase sign-in
     // Call AuthService to handle Firebase sign-in
     this.authService
     .signIn(this.LogForm.value.email, this.LogForm.value.password)
     .then(async (userCredential: import('firebase/auth').UserCredential) => {
       console.log('User signed in:', userCredential.user);

       // Fetch the user data from Firestore using the UID
       const userData = await this.authService.getUserData(userCredential.user.uid);

       if (userData) {
         // Log the user data from Firestore to the console
         console.log('User data from Firestore:', userData);
         this.saveUser(userData);
       } else {
         console.error('No user data found for UID:', userCredential.user.uid);
         alert('No user data found. Please try again later.');
       }
     })
     .catch((err: import('firebase/app').FirebaseError) => {
       console.error('Error signing in:', err.message);
     })
     .finally(() => {
       this.isLoading = false;
     });
  }


  // Email validation function
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async saveUser(user: any){
    if (!user.level || !user.field) {
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
