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
  courses = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  courseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private preferenceService: PreferencesService
  ) {
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      course: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });

    this.preferenceService.get('user').then(user => {
      this.getSubjects(user.level);
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

  addCourse() {
    const newCourse = this.courseForm.value;
    console.log('New Course:', newCourse); // Add your save logic here
    this.closeModal();
  }

  sendState(){
    this.isModalOpen=false;
    this.state.emit(this.isModalOpen);
  }

  createEntry(){
    this.entry.emit(this.courseForm.value);
    this.isModalOpen = false;
  }

  getSubjects(level:any){
    this.subjectService.getAllSubjects().subscribe(
      data => {
        this.subjects = data.filter(subject=>subject.level===level);
      },
      error => {
        console.log(error);
      }
    )
  }
}
