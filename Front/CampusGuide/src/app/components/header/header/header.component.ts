import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  show: boolean = false;
  constructor() { }

  ngOnInit() {}

  showMenu(){
    this.show = true;
    console.log("showMenu");
  }
}
