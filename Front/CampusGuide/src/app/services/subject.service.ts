import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl =  "https://campusbackend-36og.onrender.com/subject";
  constructor(private http: HttpClient) { }

  //getAllSubjects
  getAllSubjects(): Observable<any[]>{
    const url = this.apiUrl;
    return this.http.get<any[]>(url);
  }

  getAllSubjects2(): Observable<any>{
    const url = this.apiUrl; //replace with actual api to fetch all subjects
    return this.http.get<any>(url);
  }

  getSubjectsByLevelAndFieldAndSpecialty(level?: number, field?: string, specialty?: string): Observable<any[]> {
    if (level) {
      if (field) {
        if(specialty){
          const url = `${this.apiUrl}/filter?level=${level}&field=${field}&specialty=${specialty}`;
          return this.http.get<any[]>(url);
        }
        return this.http.get<any[]>(`${this.apiUrl}/filter?level=${level}&field=${field}`);
      }
      if (specialty) {
        return this.http.get<any[]>(`${this.apiUrl}/filter?level=${level}&specialty=${specialty}`);
      }
      return this.http.get<any[]>(`${this.apiUrl}/filter?level=${level}`);
    }
    if (field) {
      if (specialty) {
        return this.http.get<any[]>(`${this.apiUrl}/filter?field=${field}&specialty=${specialty}`);
      }
      return this.http.get<any[]>(`${this.apiUrl}/filter?field=${field}`);
    }
    if (specialty) {
      return this.http.get<any[]>(`${this.apiUrl}/filter?specialty=${specialty}`);
    }
    return this.http.get<any[]>(`${this.apiUrl}/filter`);
  }

  getSubjectsIconsByLevel(level: number): Observable<any[]> {
    const apiUrl = "assets/subjects.json";
    return this.http.get<any[]>(apiUrl).pipe(
      map((data: any) => {
        return data.subjects.filter((subject: any) => subject.level === level);
      })
    );
  }

  getIcons(): Observable<any[]>{
    const apiUrl = "assets/subjects.json";
    return  this.http.get<any[]>(apiUrl);
  }

  getIconByName(subjectName: string): Observable<string | null> {
    return new Observable((observer) => {
      this.getIcons().subscribe(
        (data: any) => {
        for (const specialty of data.subjects) {
          for (const semester of specialty.semesters) {
            const subject = semester.find((s:any) => s.name === subjectName);
            if (subject) {
              observer.next(subject.icon); // Return icon if found
              return;
            }
          }
        }
        observer.next(null); // Return null if not found
      });
    });
  }
}
