import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Import IonicModule
import { TabsComponent } from './tabs.component';  // Import the Tabs component

@NgModule({
  declarations: [TabsComponent],  // Declare your Tabs component here
  imports: [
    CommonModule,
    IonicModule  // Import IonicModule here
  ],
  exports: [TabsComponent]  // Export TabsComponent to use in other parts of the app
})
export class TabsModule {}
