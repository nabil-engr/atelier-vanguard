import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  imports: [RouterLink],
  template: `<section class="confirmation">
    <div class="mark"><i class="bi bi-check2"></i></div>
    <span class="eyebrow">ORDER CONFIRMED</span>
    <h1>Thank you.</h1>
    <p>
      Your order number is <b>AV-2026-10428</b>. We will review your measurements before cutting
      begins.
    </p>
    <div class="next">
      <span>1<b>Measurement review</b></span
      ><span>2<b>Tailoring begins</b></span
      ><span>3<b>Delivery in 4–6 weeks</b></span>
    </div>
    <a routerLink="/order/AV-2026-10428" class="btn-atelier">Track your order</a
    ><a routerLink="/shop" class="continue">Continue shopping</a>
  </section>`,
  styles: [
    `
      .confirmation {
        min-height: 70vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 3rem 1rem;
      }
      .mark {
        width: 80px;
        height: 80px;
        border: 1px solid var(--gold);
        display: grid;
        place-items: center;
        font-size: 2rem;
        color: var(--gold);
        margin-bottom: 2rem;
      }
      .confirmation h1 {
        font-size: clamp(3rem, 7vw, 6rem);
      }
      .confirmation > p {
        max-width: 620px;
        color: var(--muted);
      }
      .next {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        max-width: 750px;
        width: 100%;
        margin: 2rem 0;
      }
      .next span {
        padding: 1rem;
        border: 1px solid var(--line);
        color: var(--gold);
        font-family: var(--serif);
        font-size: 1.4rem;
      }
      .next b {
        display: block;
        color: var(--ink);
        font-family: var(--sans);
        font-size: 0.75rem;
        margin-top: 0.5rem;
      }
      .continue {
        margin-top: 1rem;
        color: var(--navy);
      }
      @media (max-width: 550px) {
        .next {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class Confirmation {}
