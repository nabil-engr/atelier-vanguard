import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [FormsModule],
  template: `<section class="booking">
    <div class="copy">
      <span class="eyebrow">VIRTUAL FITTING</span>
      <h1>Meet with a tailor</h1>
      <p>Get measurement guidance and fabric advice in a private 20-minute video appointment.</p>
      <ul>
        <li>No charge</li>
        <li>Your local time</li>
        <li>Measurement profile included</li>
      </ul>
    </div>
    <form (ngSubmit)="booked.set(true)">
      <h2>Choose a time</h2>
      <label>Date</label
      ><input class="form-control" type="date" name="date" [(ngModel)]="date" required /><label
        >Time</label
      >
      <div class="times">
        @for (t of times; track t) {
          <button type="button" [class.selected]="time() === t" (click)="time.set(t)">
            {{ t }}
          </button>
        }
      </div>
      <label>Email</label
      ><input class="form-control" type="email" name="email" [(ngModel)]="email" required /><button
        class="btn-atelier w-100 mt-4"
      >
        Confirm appointment
      </button>
      @if (booked()) {
        <div class="confirmed">
          <i class="bi bi-check2-circle"></i><b>Appointment requested</b
          ><span>We will email your confirmation shortly.</span>
        </div>
      }
    </form>
  </section>`,
  styles: [
    `
      .booking {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 72vh;
      }
      .copy {
        padding: clamp(4rem, 8vw, 8rem);
        background: var(--navy);
        color: white;
      }
      .copy h1 {
        color: white;
        font-size: clamp(3rem, 6vw, 5rem);
        line-height: 1;
      }
      .copy p,
      .copy li {
        color: #c7cbd0;
      }
      .copy ul {
        padding: 0;
        list-style: none;
        margin-top: 2rem;
      }
      .copy li {
        padding: 0.7rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
      form {
        padding: clamp(3rem, 7vw, 7rem);
        max-width: 700px;
      }
      form h2 {
        font-size: 2.5rem;
      }
      label {
        display: block;
        margin: 1.3rem 0 0.4rem;
        text-transform: uppercase;
        letter-spacing: 0.14em;
        font-size: 0.7rem;
      }
      .times {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
      }
      .times button {
        border: 1px solid var(--line);
        background: white;
        padding: 0.8rem;
      }
      .times .selected {
        border-color: var(--gold);
        background: #f6ecda;
      }
      .confirmed {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        background: #e2eee7;
        margin-top: 1rem;
      }
      .confirmed i {
        color: #277b48;
      }
      @media (max-width: 750px) {
        .booking {
          grid-template-columns: 1fr;
        }
        .copy,
        form {
          padding: 3rem 1rem;
        }
      }
    `,
  ],
})
export class Booking {
  date = '';
  email = '';
  times = ['10:00', '12:30', '15:00', '17:30'];
  time = signal('10:00');
  booked = signal(false);
}
