import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';
import { IonTab } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBack, person} from "ionicons/icons"
import { TabsModule } from "./components/tabs/tabs.module";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, TabsModule],
})
export class AppComponent {
  excludedRoutes: string[] = ['/splash', '/', 'signin', '/signin/signup'];

  constructor(private router: Router) {
    this.addAllIcons();
    // StatusBar.hide();
  }

  addAllIcons(){
    addIcons({
      arrowBack,
      person
    })
  }

  shouldShowComponent(): boolean {
    // Check if the current route starts with any excluded route
    return !this.excludedRoutes.some(route => this.router.url.startsWith(route));
  }
}
