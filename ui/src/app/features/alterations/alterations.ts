import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alterations',
  imports: [FormsModule],
  template: `<section class="container-wide section narrow">
    <span class="eyebrow">AFTERCARE</span>
    <h1>Alteration support</h1>
    <p class="lead">
      If your garment needs a small local adjustment, submit the details and receipt for review.
    </p>
    <form class="surface" (ngSubmit)="submitted.set(true)">
      <label>Order</label
      ><select class="form-select" name="order" [(ngModel)]="order">
        <option>AV-2026-10428 · Mayfair Royal Drape</option></select
      ><label>What needs adjusting?</label
      ><select class="form-select" name="issue" [(ngModel)]="issue">
        <option>Sleeve length</option>
        <option>Waist</option>
        <option>Trouser length</option>
        <option>Other</option></select
      ><label>Details</label
      ><textarea
        class="form-control"
        rows="4"
        name="details"
        [(ngModel)]="details"
        required
      ></textarea
      ><label>Receipt or photo</label><input class="form-control" type="file" /><button
        class="btn-atelier mt-4"
      >
        Submit request
      </button>
      @if (submitted()) {
        <div class="alert alert-success rounded-0 mt-3 mb-0">Request submitted for review.</div>
      }
    </form>
  </section>`,
  styles: [
    `
      .narrow {
        max-width: 850px;
      }
      h1 {
        font-size: clamp(3rem, 6vw, 5rem);
      }
      .lead {
        color: var(--muted);
        max-width: 650px;
      }
      form {
        padding: clamp(1.5rem, 5vw, 3rem);
        margin-top: 2rem;
      }
      label {
        display: block;
        margin: 1.2rem 0 0.4rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.7rem;
      }
    `,
  ],
})
export class Alterations {
  order = 'AV-2026-10428 · Mayfair Royal Drape';
  issue = 'Sleeve length';
  details = '';
  submitted = signal(false);
}
