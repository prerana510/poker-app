import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


interface UserDTO {
  userName: string;
  emailId: string;
  password: string;
  firstname: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 

  private apiUrl = '/api/auth/roles'; 
  private apiUrl2 = '/api/keycloak'// Your backend API endpoint

  constructor(private http: HttpClient) { }

  // Method to login and get access token and roles
  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    
    // Set up the HTTP headers if needed (e.g., Content-Type)
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this.http.post<any>(this.apiUrl, credentials, { headers });

  }

  // Method to register a new user
  register(user: UserDTO): Observable<string> {
    // POST request to registration API
    //const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<string>(this.apiUrl2, user);
  }
}
