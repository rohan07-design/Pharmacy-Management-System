import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ROOT_URL = "http://localhost:8000/api/user";

  constructor(private http:HttpClient,
    private router:Router) { }

  register(user:any) {
    return this.http.post<any>(`${this.ROOT_URL}/register`, user);
  }

  login(user:any) {
    return this.http.post<any>(`${this.ROOT_URL}/login`,user);
  }

  loggedIn() {
    return !localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["user/login"])
  }
}
