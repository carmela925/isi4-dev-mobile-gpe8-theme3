import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  logo = environment.logo;
  user: any;
  isLoading = true;
  @Input()isOpen: boolean = false;
  @Output() state = new EventEmitter<boolean>();

  constructor(
        private authService : AuthService,
        private auth: Auth
  ) { 
    addIcons({personOutline})
  }

  ngOnInit() {
    console.log(this.isOpen)
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

  sendState(){
    this.isOpen=false;
    this.state.emit(this.isOpen);
  }

}
