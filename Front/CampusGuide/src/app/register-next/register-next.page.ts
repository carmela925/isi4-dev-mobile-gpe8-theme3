import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonButton, IonButtons, IonBackButton, IonInput } from '@ionic/angular/standalone';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-next',
  templateUrl: './register-next.page.html',
  styleUrls: ['./register-next.page.scss'],
  standalone: true,
  imports: [IonInput, IonBackButton, IonButtons, IonButton, IonImg, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class RegisterNextPage implements OnInit {
  logo = environment.logo;
  level!: number;
  field: string = '';
  specialty: string = '';
  role: string = 'student'; 

  constructor(private authService : AuthService) {
  }

  ngOnInit() {
    console.log('hey')
  }

  register() {
    // Ensure all inputs are provided
    if (!this.level || !this.field || !this.specialty) {
      console.log("provide all inputs");
      return;
    }
    console.log("Successfully")

    // Call AuthService to handle update
}
}