import { Component, OnInit } from '@angular/core';
import { PreferencesService } from 'src/app/services/preferences.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {
  isTeacher: boolean = false;
  constructor(private preferenceService: PreferencesService) { }

  ngOnInit() {
    this.preferenceService.get("user").then((user) => {
      this.isTeacher = user.role === "teacher";
    })
  }

}
