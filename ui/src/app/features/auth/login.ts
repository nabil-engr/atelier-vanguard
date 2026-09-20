import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `<section class="auth">
    <div class="image"></div>
    <form (ngSubmit)="login()">
      <span class="eyebrow">YOUR ACCOUNT</span>
      <h1>Welcome back</h1>
      <label>Email</label
      ><input class="form-control" type="email" name="email" [(ngModel)]="email" required /><label
        >Password</label
      ><input
        class="form-control"
        type="password"
        name="password"
        [(ngModel)]="password"
        required
      /><button class="btn-atelier w-100 mt-4" [disabled]="loading()">
        {{ loading() ? 'Signing in…' : 'Sign in' }}
      </button>
      <p>New here? <a routerLink="/register">Create an account</a></p>
      @if (error()) {
        <div class="text-danger">Email or password is incorrect.</div>
      }
    </form>
  </section>`,
  styles: [
    `
      .auth {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 72vh;
      }
      .image {
        background: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCiEcCh09AKJTvsDjnPHtNqhFGPHgjjIhFx3CGy3NnM1TatvJ2RAj-0zlc1ycjv4xxcUyOb0xoCJVp-6oe_mVnck3M2cYHHJBTuq5Mehc9BjgPEJKjaThVRPGyDn8w5tGyu0bhDNcIosRA1-qpA7uQtRXApkAMHFerIJgeFfeR6eW1t_x687IzgeNadSEbVhD7F-hGHd-lC2dV1gS1ddvOv3Y1W8UOmq1fpo82xxDAAn2C8QJTHPf7h')
          center/cover;
      }
      form {
        padding: clamp(3rem, 8vw, 8rem);
        align-self: center;
      }
      h1 {
        font-size: 3.5rem;
      }
      label {
        display: block;
        margin: 1.3rem 0 0.4rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.7rem;
      }
      form p {
        text-align: center;
        margin-top: 1rem;
      }
      form a {
        color: var(--gold-dark);
      }
      @media (max-width: 700px) {
        .auth {
          grid-template-columns: 1fr;
        }
        .image {
          height: 220px;
        }
        form {
          padding: 3rem 1rem;
        }
      }
    `,
  ],
})
export class Login {
  email = '';
  password = '';
  error = signal(false);
  loading = signal(false);
  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}
  login() {
    if (!this.email || !this.password) {
      this.error.set(true);
      return;
    }
    this.loading.set(true);
    this.error.set(false);
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigateByUrl(this.auth.isAdmin() ? '/admin' : '/account'),
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }
}
