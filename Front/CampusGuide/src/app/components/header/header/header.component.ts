import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  show: boolean = false;
  user: any;
  isLoading: boolean = true; 
  constructor(
        private authService : AuthService,
        private auth: Auth
  ) { }

  ngOnInit() {
    console.log("hey");
    const user = this.auth.currentUser;
    console.log(user);
    if (user) {
      this.authService.getUserData(user.uid).then(userData => {
        this.user = userData;
      }).catch(err => {
        console.error('Error fetching user data:', err);
        this.isLoading = false;
      });
    } else {
      console.error('No user is currently logged in.');
      this.isLoading = false;
    }
  }

  showMenu(){
    this.show = true;
    console.log("showMenu");
  }

  receivedState(state: boolean) {
    this.show = state;
  }
}
