import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-account',
  imports: [RouterLink],
  template: `<section class="container-wide section">
    <div class="account-head">
      <div>
        <span class="eyebrow">YOUR ACCOUNT</span>
        <h1>Welcome, {{ auth.user()?.fullName }}</h1>
      </div>
      <button (click)="logout()">Sign out</button>
    </div>
    <div class="account-grid">
      <aside>
        <a class="active">Overview</a><a>Orders</a><a routerLink="/measurements">Measurements</a
        ><a routerLink="/booking">Appointments</a
        ><a routerLink="/alterations">Alteration support</a>
      </aside>
      <main>
        <div class="current surface">
          <div>
            <span class="eyebrow">IN PRODUCTION · AV-2026-10428</span>
            <h2>Mayfair Royal Drape</h2>
            <p>Estimated delivery: 18 October</p>
          </div>
          <a routerLink="/order/AV-2026-10428" class="btn-outline-atelier">View order</a>
          <div class="progress-line">
            <i class="done"></i><i class="done"></i><i class="done"></i><i></i><i></i>
          </div>
          <div class="labels">
            <span>Confirmed</span><span>Measured</span><span>Cutting</span><span>Tailoring</span
            ><span>Delivery</span>
          </div>
        </div>
        <div class="cards">
          <a routerLink="/measurements" class="surface"
            ><i class="bi bi-rulers"></i><b>Measurements</b><span>1 approved profile</span></a
          ><a routerLink="/booking" class="surface"
            ><i class="bi bi-camera-video"></i><b>Virtual fitting</b
            ><span>Book an appointment</span></a
          ><a routerLink="/alterations" class="surface"
            ><i class="bi bi-scissors"></i><b>Alteration support</b><span>Submit a request</span></a
          >
        </div>
      </main>
    </div>
  </section>`,
  styles: [
    `
      .account-head {
        display: flex;
        justify-content: space-between;
        align-items: end;
        margin-bottom: 3rem;
      }
      .account-head h1 {
        font-size: clamp(2.5rem, 5vw, 4.5rem);
      }
      .account-head button {
        border: 0;
        border-bottom: 1px solid;
        background: none;
        color: var(--muted);
      }
      .account-grid {
        display: grid;
        grid-template-columns: 220px 1fr;
        gap: 3rem;
      }
      .account-grid > aside {
        display: flex;
        flex-direction: column;
      }
      .account-grid > aside a {
        padding: 0.9rem;
        border-bottom: 1px solid var(--line);
        color: inherit;
        text-decoration: none;
      }
      .account-grid > aside a.active {
        background: var(--navy);
        color: white;
      }
      .current {
        padding: 2rem;
        display: grid;
        grid-template-columns: 1fr auto;
      }
      .current h2 {
        font-size: 2rem;
      }
      .progress-line,
      .labels {
        grid-column: 1/-1;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        margin-top: 2rem;
      }
      .progress-line i {
        height: 3px;
        background: #d8d3ca;
      }
      .progress-line i.done {
        background: var(--gold);
      }
      .labels span {
        font-size: 0.68rem;
        color: var(--muted);
        margin-top: 0.5rem;
      }
      .cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-top: 1rem;
      }
      .cards a {
        padding: 1.5rem;
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .cards i {
        font-size: 1.5rem;
        color: var(--gold);
      }
      .cards span {
        color: var(--muted);
        font-size: 0.8rem;
      }
      @media (max-width: 750px) {
        .account-grid {
          grid-template-columns: 1fr;
        }
        .account-grid > aside {
          display: none;
        }
        .current {
          grid-template-columns: 1fr;
        }
        .current > a {
          width: max-content;
        }
        .cards {
          grid-template-columns: 1fr;
        }
        .labels span {
          font-size: 0.55rem;
        }
      }
    `,
  ],
})
export class Account {
  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
