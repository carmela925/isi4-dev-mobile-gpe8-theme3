import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from 'primeng/dragdrop';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonTabButton, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styles: [
    `:host ::ng-deep {
        [pDraggable] {
            cursor: move;
        }
    }`
],
  styleUrls: ['./timetable.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonTabButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, DragDropModule]
})
export class TimetablePage implements OnInit {

  constructor(){}

  ngOnInit() {

  }

}
