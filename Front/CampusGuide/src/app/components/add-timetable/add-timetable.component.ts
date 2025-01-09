import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'src/app/models/subject';
import { PreferencesService } from 'src/app/services/preferences.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html',
  styleUrls: ['./add-timetable.component.scss'],
})
export class AddTimetableComponent  implements OnInit {
  @Input()isModalOpen = false;
  @Output() state = new EventEmitter<boolean>();
  @Output() entry = new EventEmitter<any>();
  subjects: Subject[] = [];
  courseForm!: FormGroup;
  initial = ''+(new Date().getHours())+':'+(new Date().getMinutes());

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private preferenceService: PreferencesService
  ) {
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      course: ['', Validators.required],
      startTime: [this.initial],
      endTime: [this.initial],
    });

    this.preferenceService.get('user').then(user => {
      if(user.role==='student'){
        this.getSubjects(user.level,user.field,user.specialty);
      }
      if(user.role==='teacher'){
        this.getAllSubjects();
      }
    }).catch(error => {
      console.error('Error retrieving user:', error);
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.courseForm.reset();
  }

  sendState(){
    this.isModalOpen=false;
    this.state.emit(this.isModalOpen);
  }

  createEntry(){
    if(this.courseForm.get('endTime')?.value<=this.courseForm.get('startTime')?.value){
      console.log("End date can't be less than start");
    } else {
      const newCourse = {
        course: this.subjects.find((subject)=>subject.id===this.courseForm.get('course')?.value),
        startTime: this.courseForm.get('startTime')?.value,
        endTime: this.courseForm.get('endTime')?.value
      };
      console.log('New Course:', newCourse);
      this.entry.emit(newCourse);
      this.isModalOpen = false;
    }
  }

  getSubjects(level:number, field: string, specialty: string){
    this.subjectService.getSubjectsByLevelAndFieldAndSpecialty(level,field,specialty).subscribe(
      (data: any) => {
        this.subjects = data.subjects;
      },
      error => {
        console.log(error);
      }
    )
  }
  getAllSubjects(){
    this.subjectService.getAllSubjects().subscribe(
      (data: any) => {
        this.subjects = data.subjects;
      },
      error => {
        console.log(error);
      }
    )
  }

  onEndTimeChange(event: any) {
    const selectedTime = event.detail.value;
    const time = new Date(selectedTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.courseForm.get('endTime')?.setValue(time); // Update the form control
  }

  onstartTimeChange(event: any) {
    const selectedTime = event.detail.value; // Get selected time value
    const time = new Date(selectedTime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    this.courseForm.get('startTime')?.setValue(time);
  }
}
