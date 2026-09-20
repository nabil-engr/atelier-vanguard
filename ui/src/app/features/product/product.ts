import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { PRODUCTS } from '../../core/data';
import { StoreService } from '../../core/store.service';

@Component({
  selector: 'app-product',
  imports: [RouterLink, CurrencyPipe],
  template: `@if (product(); as p) {
    <section class="container-wide product-page">
      <div class="visual">
        <img [src]="p.imageUrl" [alt]="p.name" /><span>Made to measure</span>
      </div>
      <div class="details">
        <span class="eyebrow">{{ p.category }} · {{ p.origin }}</span>
        <h1>{{ p.name }}</h1>
        <p class="lead">{{ p.summary }}</p>
        <div class="price">{{ p.basePrice | currency: 'USD' : 'symbol' : '1.0-0' }}</div>
        <p class="muted">Includes personal pattern, hand finishing and insured delivery.</p>
        <div class="choice">
          <label>Fabric</label><button class="selected"><i></i>{{ p.fabric }}</button
          ><button><i class="charcoal"></i>Charcoal option</button>
        </div>
        <div class="choice">
          <label>Preferred fit</label
          ><button [class.selected]="fit() === 'Tailored'" (click)="fit.set('Tailored')">
            Tailored</button
          ><button [class.selected]="fit() === 'Relaxed'" (click)="fit.set('Relaxed')">
            Relaxed
          </button>
        </div>
        <a
          [routerLink]="['/configure', p.slug]"
          class="btn-atelier d-flex justify-content-center align-items-center text-decoration-none w-100"
          >Customize</a
        >
        <button class="btn-outline-atelier w-100 mt-2" (click)="quickAdd(p)">
          {{ added() ? 'Added to bag' : 'Add with standard options' }}
        </button>
        <div class="info">
          <p><i class="bi bi-calendar3"></i> Ready in 4–6 weeks</p>
          <p><i class="bi bi-arrow-repeat"></i> Alteration support included</p>
          <p><i class="bi bi-shield-check"></i> Secure checkout</p>
        </div>
      </div>
    </section>
    <section class="construction">
      <div class="container-wide">
        <span class="eyebrow">HOW IT IS MADE</span>
        <h2>Details that improve the fit</h2>
        <div class="row g-3">
          <div class="col-md-4">
            <b>01</b>
            <h3>Full canvas</h3>
            <p>Shapes naturally to your body over time.</p>
          </div>
          <div class="col-md-4">
            <b>02</b>
            <h3>Hand-finished</h3>
            <p>Functional cuffs, pick stitching and careful pressing.</p>
          </div>
          <div class="col-md-4">
            <b>03</b>
            <h3>Your pattern</h3>
            <p>Saved securely for future orders.</p>
          </div>
        </div>
      </div>
    </section>
  }`,
  styles: [
    `
      .product-page {
        display: grid;
        grid-template-columns: minmax(0, 1.3fr) minmax(340px, 0.7fr);
        gap: 5vw;
        padding-block: 4rem;
      }
      .visual {
        position: relative;
      }
      .visual img {
        width: 100%;
        max-height: 720px;
        object-fit: cover;
      }
      .visual > span {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: var(--navy);
        color: white;
        padding: 0.4rem 0.7rem;
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }
      .details {
        padding-top: 1rem;
      }
      .details h1 {
        font-size: clamp(2.5rem, 4vw, 4.5rem);
        line-height: 1;
        margin: 1rem 0;
      }
      .lead {
        font-family: var(--serif);
        font-size: 1.2rem;
      }
      .choice {
        padding: 1.2rem 0;
        border-top: 1px solid var(--line);
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .choice label {
        width: 100%;
        text-transform: uppercase;
        font-size: 0.7rem;
        letter-spacing: 0.14em;
      }
      .choice button {
        padding: 0.75rem;
        border: 1px solid var(--line);
        background: transparent;
      }
      .choice button.selected {
        border-color: var(--gold);
        box-shadow: inset 0 0 0 1px var(--gold);
      }
      .choice i {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #13243d;
        margin-right: 0.5rem;
        vertical-align: middle;
      }
      .choice i.charcoal {
        background: #444;
      }
      .info {
        margin-top: 1.5rem;
        padding: 1.2rem;
        background: #eee8dc;
      }
      .info p {
        margin: 0.5rem 0;
      }
      .info i {
        color: var(--gold);
        margin-right: 0.6rem;
      }
      .construction {
        padding: 6rem 0;
        background: #eee8dc;
      }
      .construction h2 {
        font-size: clamp(2rem, 4vw, 3.5rem);
        margin-bottom: 2rem;
      }
      .construction .col-md-4 {
        padding: 2rem;
        background: var(--paper);
        border: 5px solid #eee8dc;
      }
      .construction b {
        color: var(--gold);
      }
      @media (max-width: 850px) {
        .product-page {
          grid-template-columns: 1fr;
          padding-block: 1rem;
        }
        .details h1 {
          font-size: 2.7rem;
        }
      }
    `,
  ],
})
export class ProductPage {
  product = computed(() =>
    PRODUCTS.find((p) => p.slug === this.route.snapshot.paramMap.get('slug')),
  );
  fit = signal('Tailored');
  added = signal(false);
  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
  ) {}
  quickAdd(p: any) {
    this.store.add(p, { fit: this.fit() });
    this.added.set(true);
  }
}
