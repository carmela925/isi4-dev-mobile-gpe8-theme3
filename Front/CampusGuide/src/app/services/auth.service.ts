import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData, getDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Here too Axel (laughing emoji)*2
  //Your big head
  private apiUrl = "https://campusbackend-36og.onrender.com/auth";
  private currentUserSubject = new BehaviorSubject<any>(null);  // Holds the user data
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth,private http: HttpClient,private router : Router, private firestore: Firestore) {}

  async signUp(email: string, password: string, displayName: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Set the displayName
        await updateProfile(user, { displayName: displayName });
        console.log('User profile updated with displayName:', displayName);
      }

      await setDoc(doc(this.firestore, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // Add any additional attributes here
        role: 'student', // Example attribute
        level : '',
        speciality : '',
        field : ''
      });

      return userCredential;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;  // Ensure we return the userCredential object
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;  // Re-throw the error to be caught in the component
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log('Password reset email sent.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  getAuth(){
    return this.auth.currentUser;
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  registerUser(uid: string, email: string, name: string): Observable<any> {
    const body = {
      uid,
      email,
      name,
    };

    return this.http.post(`${this.apiUrl}/register`, body);
  }

  updateUserStudent(uid: string, level: number, field: string, specialty: string){
    const body = {
      level,
      field,
      specialty
    }
    return this.http.put(`${this.apiUrl}/users/${uid}`, body);
  }

  async getUserData(uid: string) {
    try {
      const userDoc = await getDoc(doc(this.firestore, 'users', uid));

      if (userDoc.exists()) {
        return userDoc.data();  // Returns the user data
      } else {
        console.error('No user data found in Firestore');
        throw new Error('No user data found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
  // getUserObservable(): Observable<User | null> {
  //   return this.user$;
  // }

  //Axel worked Here
  // signup(email: string, password: string, name: string) {
  //   const userData = { email, password, name };

  //   return this.http.post(`${this.apiUrl}/register`, userData);
  // }

  // signinUser(email: string, password: string): Observable<any> {
  //   const credentials = { email, password };
  //   return this.http.post(`${this.apiUrl}/login`, credentials);
  // }


}
