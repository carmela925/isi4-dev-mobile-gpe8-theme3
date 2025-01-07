import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButton, IonButtons, IonBackButton, IonInput } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-next',
  templateUrl: './register-next.page.html',
  styleUrls: ['./register-next.page.scss'],
  standalone: true,
  imports: [IonInput, IonBackButton, IonButtons, IonButton, IonImg, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class RegisterNextPage implements OnInit {
  logo = environment.logo;
  userid: string | null = null;
  level!: number;
  field: string = '';
  specialty: string = '';
  role: string = 'student'; 

  constructor(
    private authService : AuthService,
    private route: ActivatedRoute,
    private redirect: Router
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.userid = params.get('id');
      console.log(this.userid);
    });
  }

  register() {
    // Ensure all inputs are provided
    if (!this.level || !this.field || !this.specialty) {
      console.log("provide all inputs");
      return;
    }
    if (this.userid) {
      this.authService.updateUserStudent(this.userid, this.level, this.field, this.specialty).subscribe(
        (data)=>{
          console.log(data);
          console.log("heyy");
          this.redirect.navigate(['home']);
        },
        (error) => console.error(error)  // Handle errors as needed. For example, display a popup message.  // Example: this.toastController.create({ message: 'Registration failed', duration: 2000 }).then(toast => toast.present());  // Display a toast message.  // Example: this.router.navigate(['/tabs/home']);  // Navigate to home page.  // Example: this.router.navigate(['/tabs
      )
    }
  }
}