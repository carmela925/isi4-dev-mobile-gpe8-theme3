import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonText, IonButton, IonInput, IonItem, IonList, IonLabel, IonCheckbox, IonIcon, LoadingController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCheckbox,
    IonLabel,
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
export class ForgetPwdComponent  implements OnInit {
  resetForm !: FormGroup;
  message: string | null = null;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(){
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword() {
    const email = this.resetForm.value.email;
    if (!email) {
      this.error = 'Please provide a valid email address.';
      return;
    }

    this.authService
      .resetPassword(email)
      .then(() => {
        this.message = 'A password reset link has been sent to your email.';
        this.error = null;
        this.router.navigate(['/signin']);
      })
      .catch((err) => {
        this.message = null;
        this.error = 'Error: Unable to send password reset email.';
        console.error(err);
      });
  }

}
