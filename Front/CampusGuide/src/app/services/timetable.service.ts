import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private apiUrl = 'http://localhost:3000/timetable'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Get Timetable for the authenticated student
  getTimetable() {
      return this.http.get(`${this.apiUrl}`);
  }

  // Add a new timetable entry
  addTimetableEntry(timetableData: any) {
      return this.http.post(`${this.apiUrl}/`, timetableData);
  }

  // Delete a timetable entry
  deleteTimetableEntry(timetableData: any) {
      return this.http.delete(`${this.apiUrl}/`, timetableData);
  }

}
