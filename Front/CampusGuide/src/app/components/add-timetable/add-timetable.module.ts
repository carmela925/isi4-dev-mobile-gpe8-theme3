import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Import IonicModule
import { AddTimetableComponent } from './add-timetable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddTimetableComponent],  // Declare your Header component here
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule 
],
  exports: [AddTimetableComponent]  // Export HeaderComponent to use in other parts of the app
})
export class AddTimetableModule {}
