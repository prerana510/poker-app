import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  private apiUrl = '/api/auth/roles';  // Your backend API endpoint

  constructor(private http: HttpClient) { }

  // Method to login and get access token and roles
  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    
    // Set up the HTTP headers if needed (e.g., Content-Type)
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.post<any>(this.apiUrl, credentials, { headers });
  }
}
