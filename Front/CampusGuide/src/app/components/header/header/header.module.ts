import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Import IonicModule
import { HeaderComponent } from './header.component';  // Import the Header component

@NgModule({
  declarations: [HeaderComponent],  // Declare your Header component here
  imports: [
    CommonModule,
    IonicModule  // Import IonicModule here
  ],
  exports: [HeaderComponent]  // Export HeaderComponent to use in other parts of the app
})
export class HeaderModule {}
