import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { tap } from 'rxjs';

export interface SessionUser {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
}
interface LoginResponse {
  accessToken: string;
  user: SessionUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<SessionUser | null>(this.readUser());
  readonly isLoggedIn = computed(() => !!this.user() && !!localStorage.getItem('access_token'));
  readonly isAdmin = computed(
    () => this.user()?.roles?.some((role) => role === 'Admin' || role === 'SuperAdmin') ?? false,
  );

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>('/api/v1/auth/login', { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('atelier-user', JSON.stringify(response.user));
        this.user.set(response.user);
      }),
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('atelier-user');
    this.user.set(null);
  }

  private readUser(): SessionUser | null {
    try {
      return JSON.parse(localStorage.getItem('atelier-user') ?? 'null');
    } catch {
      return null;
    }
  }
}
