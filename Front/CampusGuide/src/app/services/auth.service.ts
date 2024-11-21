import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

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
