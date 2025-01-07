import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private apiUrl = "https://campusbackend-36og.onrender.com"; // Backend URL

  constructor(private http: HttpClient) {}

  // Add a question
  addQuestion(question: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/questions`, question);
  }

  uploadDoc(formData: FormData): Observable<any> {
    return this.http.post('https://campusbackend-36og.onrender.com/upload/pdf', formData);
  }

  // Get all questions
  getAllQuestions() {
    return this.http.get(`${this.apiUrl}/questions`).toPromise();
  }

  // Get questions by subject
  getQuestionsBySubject(subjectId: string) {
    return this.http.get(`${this.apiUrl}/questions/${subjectId}`).toPromise();
  }

  downloadFile(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/files/download/${filename}`, {
      responseType: 'blob'
    });
  }

  // Delete a question
  deleteQuestion(questionId: string) {
    return this.http.delete(`${this.apiUrl}/questions/${questionId}`).toPromise()
      .then(() => {
        console.log('Question deleted successfully!');
      })
      .catch((error) => {
        console.log(error.error || error.message);
      });
  }

  getRecentQuestions(limit: number, createdBy?: string){
    if (createdBy) {
      return this.http.get(`${this.apiUrl}/questions/recent/limit?limit=`+limit+`&createdBy=`+createdBy);
    }
    return this.http.get(`${this.apiUrl}/questions/recent/limit?limit=`+limit);
  }
}
