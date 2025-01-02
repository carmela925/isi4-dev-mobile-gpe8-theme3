import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonTabButton, IonButton, IonIcon, IonLabel, IonItem, IonDatetime, IonModal, IonDatetimeButton, IonBackdrop } from '@ionic/angular/standalone';
import { HeaderModule } from "../../components/header/header/header.module";
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';

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
  imports: [IonBackdrop,IonDatetime,IonIcon, IonButton, IonContent, CommonModule, FormsModule, DragDropModule, HeaderModule]
})
export class TimetablePage implements OnInit,AfterViewInit {
  @ViewChildren('card') cards!: QueryList<ElementRef>
  @ViewChildren('cardmarker') cardmarkers!: QueryList<ElementRef>
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  @ViewChildren('dateBox') dateBoxes!: QueryList<ElementRef>;

  isDatePickerOpen = false;
  
  dates: { date: number; day: string }[] = [];
  selectedDate: number | null = new Date().getDate();
  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();
  initialDate: string = new Date().toISOString();

  months = [
    'Jan',
    'Feb',
    'March',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
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

  constructor(){
    addIcons({
      calendarOutline
    });
    this.selectedDate = new Date().getDate();
  }
  
  ngOnInit() {
    this.updateDates();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dimensionMarkers();
      this.scrollToSelectedDate();
    }, 0);
  }


  openDatePicker() {
    this.isDatePickerOpen = true;
    console.log("openDatePicker");
  }

  closeDatePicker() {
    this.isDatePickerOpen = false;
    console.log("closeDatePicker");
  }

  scrollToSelectedDate() {
    const selectedBox = this.dateBoxes.find(
      (box, index) => this.dates[index].date === this.selectedDate
    );

    if (selectedBox) {
      const container = this.scrollContainer.nativeElement;
      const boxElement = selectedBox.nativeElement;

      const containerRect = container.getBoundingClientRect();
      const boxRect = boxElement.getBoundingClientRect();

      // Calculate scroll offset to center the selected element
      const offset =
        boxRect.left - containerRect.left + container.scrollLeft - container.offsetWidth / 2 + boxElement.offsetWidth / 2;
        console.log("boxRect: ",boxRect)
        console.log("containerRect: ",containerRect)
        console.log("offset: " + offset)
        console.log("offset: " + offset)

      container.scrollTo({
        left: offset,
        behavior: 'smooth',
      });
    }
  }

  // Update dates and days based on selected month and year
  updateDates() {
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    this.dates = Array.from({ length: daysInMonth }, (_, i) => {
      const date = i + 1;
      const dayName = new Date(this.selectedYear, this.selectedMonth, date).toLocaleString('en-US', { weekday: 'short' });
      return { date, day: dayName };
    });
  }

    /**
     * Handle changes from the ion-datetime component.
    * @param event - The ionChange event containing the selected value.
    */
   onDateChange(event: any) {
    const selectedModalDate = new Date(event.detail.value); // Convert the value to a Date object
    this.selectedYear = selectedModalDate.getFullYear();    // Extract the year
    this.selectedMonth = selectedModalDate.getMonth();      // Extract the month (0-indexed)
    console.log("selectedDate: ",selectedModalDate);
    this.selectedDate = selectedModalDate.getDate();
    this.updateDates();    
    this.closeDatePicker()                            // Update the dates array
    this.scrollToSelectedDate();
   }

  onDateSelect(date: number) {
    this.selectedDate = date; // Highlight selected date
    console.log(`Selected date: ${this.selectedYear}-${this.selectedMonth + 1}-${date}`);
    this.scrollToSelectedDate();
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  dimensionMarkers(){
    this.cards.forEach((element,index) => {
      const c = element.nativeElement as HTMLElement;
      console.log(c.getBoundingClientRect());

      const m = this.cardmarkers.get(index)?.nativeElement as HTMLElement;
      m.style.height = c.getBoundingClientRect().height-40+'px';
    });
  }
}
