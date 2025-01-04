import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  //getAllSubjects
  getAllSubjects(): Observable<any[]>{
    const url = 'assets/allsubjects.json'; //replace with actual api to fetch all subjects
    return this.http.get<any[]>(url);
  }

  //choose a subject as a teacher that is the teacher chooses the subjects he teaches
  // Associating a subject to a teacher
  chooseSubjectAsTeacher(subjectId: string, teacherId: string) {
    // TODO: Implement logic to choose a subject as a teacher
  }

  getSubjectsIconsByLevel(level: number): Observable<any[]> {
    const apiUrl = "assets/subjects.json";
    return this.http.get<any[]>(apiUrl).pipe(
      map((data: any) => {
        // Filter out the subjects by the specified level
        return data.subjects.filter((subject: any) => subject.level === level);
      })
    );
  }
}
