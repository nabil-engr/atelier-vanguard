import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  imports: [RouterLink],
  template: `<section class="container-wide section">
    <a routerLink="/account" class="back">← Account</a
    ><span class="eyebrow d-block mt-4">ORDER AV-2026-10428</span>
    <h1>Your order journey</h1>
    <div class="order">
      <div class="timeline">
        @for (s of stages; track s.name; let i = $index) {
          <div [class.done]="s.done">
            <i>{{ s.done ? '✓' : i + 1 }}</i>
            <div>
              <b>{{ s.name }}</b
              ><span>{{ s.note }}</span>
            </div>
          </div>
        }
      </div>
      <aside class="surface">
        <h2>Mayfair Royal Drape</h2>
        <p>Super 150s navy wool</p>
        <dl>
          <dt>Fit</dt>
          <dd>Tailored</dd>
          <dt>Measurement</dt>
          <dd>Approved</dd>
          <dt>Total</dt>
          <dd>$1,650</dd>
        </dl>
        <button class="btn-outline-atelier w-100">Download invoice</button
        ><a href="mailto:concierge@ateliervanguard.com">Contact concierge</a>
      </aside>
    </div>
  </section>`,
  styles: [
    `
      .back {
        color: var(--muted);
        text-decoration: none;
      }
      h1 {
        font-size: clamp(3rem, 6vw, 5rem);
      }
      .order {
        display: grid;
        grid-template-columns: 1fr 360px;
        gap: 4rem;
        margin-top: 3rem;
      }
      .timeline > div {
        display: grid;
        grid-template-columns: 44px 1fr;
        gap: 1rem;
        min-height: 95px;
        position: relative;
      }
      .timeline > div:before {
        content: '';
        position: absolute;
        left: 21px;
        top: 42px;
        bottom: 0;
        width: 1px;
        background: var(--line);
      }
      .timeline > div:last-child:before {
        display: none;
      }
      .timeline i {
        width: 44px;
        height: 44px;
        border: 1px solid var(--stone);
        display: grid;
        place-items: center;
        font-style: normal;
        background: var(--ivory);
        z-index: 1;
      }
      .timeline .done i {
        background: var(--navy);
        color: white;
      }
      .timeline b,
      .timeline span {
        display: block;
      }
      .timeline span {
        color: var(--muted);
        font-size: 0.85rem;
        margin-top: 0.3rem;
      }
      aside {
        padding: 2rem;
        height: max-content;
      }
      dl {
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-top: 1px solid var(--line);
        margin: 1.5rem 0;
      }
      dt,
      dd {
        padding: 0.7rem 0;
        border-bottom: 1px solid var(--line);
        margin: 0;
      }
      dd {
        text-align: right;
      }
      aside > a {
        display: block;
        text-align: center;
        margin-top: 1rem;
        color: var(--navy);
      }
      @media (max-width: 800px) {
        .order {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        aside {
          grid-row: 1;
        }
      }
    `,
  ],
})
export class OrderDetail {
  stages = [
    { name: 'Order confirmed', note: 'Payment received', done: true },
    { name: 'Measurements approved', note: 'Fit profile checked by your tailor', done: true },
    { name: 'Fabric and cutting', note: 'Your cloth is now being cut', done: true },
    { name: 'Tailoring', note: 'Next step', done: false },
    { name: 'Quality check', note: 'Pending', done: false },
    { name: 'Packaging and delivery', note: 'Pending', done: false },
  ];
}
