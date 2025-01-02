import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Here too Axel (laughing emoji)*2
  //Your big head
  private apiUrl = "http://localhost:5000/auth";

  constructor(private auth: Auth,private http: HttpClient,private router : Router) {}

  async signUp(email: string, password: string, displayName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Set the displayName
        updateProfile(user, { displayName: displayName });
        console.log('User profile updated with displayName:', displayName);
      }
      return userCredential;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  //Axel worked Here
  signup(email: string, password: string, role: string, displayName: string) {
    const data = { email, password, role, displayName };
    return this.http.post(`${this.apiUrl}/register`, data).toPromise()
      .then((response: any) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error.error || error.message, 'danger');
      });
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async resetPassword(email: string){
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Password reset email sent.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
}
