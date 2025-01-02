import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Import IonicModule
import { MenuComponent } from './menu.component';  // Import the menu component

@NgModule({
  declarations: [MenuComponent],  // Declare your menu component here
  imports: [
    CommonModule,
    IonicModule  // Import IonicModule here
  ],
  exports: [MenuComponent]  // Export menuComponent to use in other parts of the app
})
export class MenuModule {}
