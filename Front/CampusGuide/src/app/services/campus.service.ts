import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampusService {

  private apiUrl = 'http://localhost:3000/locations'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Get campus details (buildings, rooms, etc.)
  getCampusDetails(): Observable<any> {
      return this.http.get(this.apiUrl);
  }

  // Search for a building or room on campus
  searchCampus(query: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/search?query=${query}`);
  }
}
