import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonTabButton, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HeaderModule } from "../../components/header/header/header.module";

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
  imports: [IonIcon, IonButton, IonContent, CommonModule, FormsModule, DragDropModule, HeaderModule]
})
export class TimetablePage implements OnInit,AfterViewInit {
  @ViewChildren('card') cards!: QueryList<ElementRef>
  @ViewChildren('cardmarker') cardmarkers!: QueryList<ElementRef>
  constructor(){}

  ngOnInit() {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dimensionMarkers();
    }, 0);
  }
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  dimensionMarkers(){
    this.cards.forEach((element,index) => {
      const c = element.nativeElement as HTMLElement;
      console.log(c.getBoundingClientRect());

      const m = this.cardmarkers.get(index)?.nativeElement as HTMLElement;
      m.style.height = c.getBoundingClientRect().height+'px';
    });
  }
}
