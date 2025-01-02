import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Here too Axel (laughing emoji)*2
  //Your big head
  private apiUrl = "https://campusbackend-36og.onrender.com/auth";

  constructor(private auth: Auth,private http: HttpClient,private router : Router) {}

  // async signUp(email: string, password: string, displayName: string) {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
  //     const user = userCredential.user;

  //     if (user) {
  //       // Set the displayName
  //       updateProfile(user, { displayName: displayName });
  //       console.log('User profile updated with displayName:', displayName);
  //     }
  //     return userCredential;
  //   } catch (error) {
  //     console.error('Error signing up:', error);
  //     throw error;
  //   }
  // }

  //Axel worked Here
  signup(email: string, password: string, name: string) {
    const userData = { email, password, name };

    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  signinUser(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  resetPassword(email: string) {
    const data = { email };
    return this.http.post(`${this.apiUrl}/forgot-password`, data).toPromise()
      .then((response: any) => {
        console.log(response.message);
      })
      .catch((error) => {
        console.log(error.error || error.message);
      });
  }
}
