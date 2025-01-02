import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private apiUrl = "https://campusbackend-36og.onrender.com"; // Backend URL

  constructor(private http: HttpClient) {}

  // Add a question
  addQuestion(question: any) {
    return this.http.post(`${this.apiUrl}/questions`, question).toPromise()
      .then((response: any) => {
        console.log('Question added successfully!');
        return response;
      })
      .catch((error) => {
        console.log(error.error || error.message);
      });
  }

  // Get all questions
  getAllQuestions() {
    return this.http.get(`${this.apiUrl}/questions`).toPromise();
  }

  // Get questions by subject
  getQuestionsBySubject(subjectId: string) {
    return this.http.get(`${this.apiUrl}/questions/${subjectId}`).toPromise();
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
}
