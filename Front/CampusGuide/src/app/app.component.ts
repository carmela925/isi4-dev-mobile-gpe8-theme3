import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { IonTab } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, arrowBack, person} from "ionicons/icons"
import { TabsModule } from "./components/tabs/tabs.module";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, TabsModule, CommonModule],
})
export class AppComponent {
  excludedRoutes: string[] = ['/splash', '/signin'];

  constructor(private router: Router) {
    this.addAllIcons();
    // StatusBar.hide();
  }

  addAllIcons(){
    addIcons({
      arrowBack,
      person,
      add
    })
  }

  shouldShowComponent(): boolean {
    // Check if the current route starts with any excluded route
    console.log(this.router.url)
    console.log(this.excludedRoutes.some(route => this.router.url.startsWith(route)))
    return !this.excludedRoutes.some(route => this.router.url.startsWith(route));
  }
}
