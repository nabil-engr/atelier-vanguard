import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { PRODUCTS } from '../../core/data';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <section class="shop-head">
      <div class="container-wide">
        <span class="eyebrow">MADE TO MEASURE</span>
        <h1>The collection</h1>
        <p>Made only after you order. Delivered in 4–6 weeks.</p>
      </div>
    </section>
    <section class="container-wide py-5">
      <div class="toolbar">
        <div class="filters">
          @for (c of categories; track c) {
            <button [class.active]="category() === c" (click)="category.set(c)">{{ c }}</button>
          }
        </div>
        <span>{{ filtered().length }} garments</span>
      </div>
      <div class="row g-4 mt-2">
        @for (p of filtered(); track p.id) {
          <a class="col-sm-6 col-lg-4 card-product" [routerLink]="['/product', p.slug]"
            ><div>
              <img [src]="p.imageUrl" [alt]="p.name" /><span class="tag">{{ p.category }}</span>
            </div>
            <h2>{{ p.name }}</h2>
            <p>{{ p.fabric }} · {{ p.origin }}</p>
            <b>{{ p.basePrice | currency: 'USD' : 'symbol' : '1.0-0' }}</b></a
          >
        } @empty {
          <p>No garments match this filter.</p>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .shop-head {
        padding: 5rem 0 3rem;
        background: #eee8dc;
      }
      .shop-head h1 {
        font-size: clamp(3rem, 6vw, 5rem);
      }
      .shop-head p {
        color: var(--muted);
      }
      .toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--line);
        padding-bottom: 1rem;
      }
      .filters {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .filters button {
        border: 1px solid var(--line);
        background: transparent;
        padding: 0.6rem 1rem;
      }
      .filters button.active {
        background: var(--navy);
        color: white;
      }
      .toolbar > span {
        font-size: 0.8rem;
        color: var(--muted);
      }
      .card-product {
        color: inherit;
        text-decoration: none;
      }
      .card-product > div {
        position: relative;
      }
      .card-product img {
        width: 100%;
        aspect-ratio: 4/5;
        object-fit: cover;
      }
      .tag {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: var(--paper);
        padding: 0.35rem 0.55rem;
        font-size: 0.65rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      .card-product h2 {
        font-size: 1.45rem;
        margin: 1rem 0 0.3rem;
      }
      .card-product p {
        color: var(--muted);
        margin: 0;
      }
      .card-product b {
        display: block;
        margin-top: 0.6rem;
        font-family: var(--serif);
        font-weight: 400;
        font-size: 1.1rem;
      }
      @media (max-width: 600px) {
        .toolbar {
          align-items: flex-start;
          gap: 1rem;
          flex-direction: column;
        }
      }
    `,
  ],
})
export class Shop {
  categories = ['All', 'Suits', 'Shirts', 'Dresses'];
  category = signal('All');
  filtered = computed(() =>
    this.category() === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === this.category()),
  );
  constructor(route: ActivatedRoute) {
    route.queryParamMap.subscribe((q) => {
      const c = q.get('category');
      if (c) this.category.set(c);
    });
  }
}
