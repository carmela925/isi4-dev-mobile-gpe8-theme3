import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  logo = environment.logo;

  constructor() { 
    addIcons({personOutline})
  }

  ngOnInit() {}

}
