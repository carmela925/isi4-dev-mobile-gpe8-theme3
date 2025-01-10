import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CdkDragDrop, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import { IonContent, IonButton, IonIcon, IonDatetime, IonBackdrop } from '@ionic/angular/standalone';
import { HeaderModule } from "../../components/header/header/header.module";
import { addIcons } from 'ionicons';
import { calendarOutline, saveOutline } from 'ionicons/icons';
import { AddTimetableModule } from "../../components/add-timetable/add-timetable.module";
import { PreferencesService } from 'src/app/services/preferences.service';
import { SubjectService } from 'src/app/services/subject.service';

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
  imports: [IonBackdrop, IonDatetime, IonIcon, IonButton, IonContent, CommonModule, FormsModule, DragDropModule, HeaderModule, AddTimetableModule]
})
export class TimetablePage implements OnInit,AfterViewInit {
  @ViewChildren('card') cards!: QueryList<ElementRef>
  @ViewChildren('cardmarker') cardmarkers!: QueryList<ElementRef>
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  @ViewChildren('dateBox') dateBoxes!: QueryList<ElementRef>;

  isDatePickerOpen = false;
  isModalOpen = false;
  
  dates: { date: number; day: string }[] = [];
  selectedDate: number | null = new Date().getDate();
  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();
  initialDate: string = new Date().toISOString();

  newTimetables = new Map<string, any[]>();
  subjectsIcons = new Map<string, string>();

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

  entries: any[] = [];

  constructor(
    private preferenceService: PreferencesService,
    private subjectService: SubjectService,
    private cdr: ChangeDetectorRef
  ){
    addIcons({
      calendarOutline,
      saveOutline,
    });
    this.selectedDate = new Date().getDate();
  }
  
  ngOnInit() {
    const newDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDate || 1);
    this.entries = this.newTimetables.get(newDate.toLocaleDateString()) || [];
    this.preferenceService.get("timetables").then((data)=>{
      this.newTimetables = data || new Map<string, any[]>(); 
      
    });
    this.updateDates();
    this.getSubjectIcons();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dimensionMarkers();
      this.scrollToSelectedDate();
    }, 0);
  }

  openModal(){
    this.isModalOpen = true;
    console.log(this.isModalOpen);
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
    const newDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDate || 1);
    this.entries = this.newTimetables.get(newDate.toLocaleDateString()) || [];
    this.updateDates();    
    this.closeDatePicker()                            // Update the dates array
    this.scrollToSelectedDate();
   }

  onDateSelect(date: number) {
    this.selectedDate = date; // Highlight selected date
    console.log(`Selected date: ${this.selectedYear}-${this.selectedMonth + 1}-${date}`);
    const newDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDate || 1);
    this.entries = this.newTimetables.get(newDate.toLocaleDateString()) || [];
    this.scrollToSelectedDate();
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.entries, event.previousIndex, event.currentIndex);
  }

  dimensionMarkers(){
    this.cards.forEach((element,index) => {
      const c = element.nativeElement as HTMLElement;
      console.log(c.getBoundingClientRect());

      const m = this.cardmarkers.get(index)?.nativeElement as HTMLElement;
      m.style.height = c.getBoundingClientRect().height-40+'px';
    });
  }

  receivedState(state: boolean) {
    this.isModalOpen = state;
  }

  recievedEntry(entry: any) {
    this.isModalOpen = false;
    console.log("entry",entry);
    const newDate = new Date(this.selectedYear, this.selectedMonth, this.selectedDate || 1);

    if(this.entries.length===0){this.entries.push(entry);}
    if(!this.entries.find(course => (course.startTime === entry.startTime || course.endTime === entry.endTime))){
      this.entries.push(entry);
    }

    this.entries.sort((a, b) => {
      const timeToMilliseconds = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 * 60 * 1000 + minutes * 60 * 1000; // Convert to milliseconds
      };
    
      return timeToMilliseconds(a.startTime) - timeToMilliseconds(b.startTime);
    });

    this.cdr.detectChanges();
    this.dimensionMarkers();

    console.log(newDate)
    this.newTimetables.set(newDate.toLocaleDateString(),this.entries);
    this.preferenceService.set("timetables",this.newTimetables);

    console.log(this.cards);
    console.log(this.entries);
  }

  getTimetable(date: Date){

  }

  getSubjectIcons(){
    this.subjectService.getIcons().subscribe(
      (data) => {
        data.subjects.forEach((sub:any)=>{
          sub.semesters.forEach((semester: any) => {
            semester.forEach((element:any) => {
              this.subjectsIcons.set(element.name, element.icon)
            });
          });
        });
        console.log(this.subjectsIcons); 
      },
      (error) => {
        console.log("Couldn't fetch subjects icons")
      }
    )
  }

  calculateDuration(startTime: string, endTime: string): string {
    // Convert time (hh:mm) to total minutes
    function timeToMinutes(time: string): number {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    }
  
    // Convert start and end time to total minutes
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
  
    // Calculate the difference in minutes
    let durationMinutes = endMinutes - startMinutes;
  
    // If the end time is earlier than the start time, add 24 hours (1440 minutes)
    if (durationMinutes < 0) {
      durationMinutes += 24 * 60;
    }
  
    // Convert the duration back to hours and minutes
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
  
    return `${hours} hours ${minutes} minutes`;
  }
}
