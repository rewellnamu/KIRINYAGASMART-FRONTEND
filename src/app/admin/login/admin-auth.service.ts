import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../../models/admin.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private baseUrl = 'http://localhost:5000/api/auth'; // Adjust if your backend uses a different URL

  constructor(private http: HttpClient, private router: Router) {}

  login(admin: Admin) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, admin);
  }

  saveToken(token: string) {
    localStorage.setItem('admin-token', token);
  }

  getToken() {
    return localStorage.getItem('admin-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('admin-token');
    this.router.navigate(['/admin/login']);
  }
}
