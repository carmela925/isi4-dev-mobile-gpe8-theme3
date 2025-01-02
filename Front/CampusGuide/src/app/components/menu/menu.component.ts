import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input()isOpen: boolean = false;
  @Output() state = new EventEmitter<boolean>();

  constructor() { 
    addIcons({personOutline})
  }

  ngOnInit() {
    console.log(this.isOpen)
  }

  sendState(){
    this.isOpen=false;
    this.state.emit(this.isOpen);
  }

}
