import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { StoreService } from '../../core/store.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe],
  template: `<section class="container-wide section">
    <span class="eyebrow">YOUR ORDER</span>
    <h1>Shopping bag</h1>
    @if (store.cart().length) {
      <div class="cart-grid">
        <div>
          @for (item of store.cart(); track $index) {
            <article>
              <img [src]="item.product.imageUrl" [alt]="item.product.name" />
              <div>
                <h2>{{ item.product.name }}</h2>
                <p>{{ item.fabric }}</p>
                <p>
                  {{ item.fit }} fit
                  @if (item.monogram) {
                    · {{ item.monogram }}
                  }
                </p>
                <button (click)="store.remove($index)">Remove</button>
              </div>
              <b>{{ item.product.basePrice | currency: 'USD' : 'symbol' : '1.0-0' }}</b>
            </article>
          }
        </div>
        <aside class="surface">
          <h2>Summary</h2>
          <p>
            <span>Subtotal</span
            ><b>{{ store.subtotal() | currency: 'USD' : 'symbol' : '1.0-0' }}</b>
          </p>
          <p><span>Insured delivery</span><b>Included</b></p>
          <hr />
          <p class="total">
            <span>Total</span><b>{{ store.subtotal() | currency: 'USD' : 'symbol' : '1.0-0' }}</b>
          </p>
          <a
            routerLink="/checkout"
            class="btn-atelier d-flex justify-content-center align-items-center text-decoration-none"
            >Checkout</a
          ><small>Taxes and duties calculated at checkout.</small>
        </aside>
      </div>
    } @else {
      <div class="empty surface">
        <i class="bi bi-bag"></i>
        <h2>Your bag is empty</h2>
        <a routerLink="/shop" class="btn-atelier">Browse garments</a>
      </div>
    }
  </section>`,
  styles: [
    `
      h1 {
        font-size: clamp(2.8rem, 5vw, 5rem);
        margin-bottom: 3rem;
      }
      .cart-grid {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 3rem;
      }
      article {
        display: grid;
        grid-template-columns: 130px 1fr auto;
        gap: 1.5rem;
        padding: 1.5rem 0;
        border-top: 1px solid var(--line);
      }
      article img {
        width: 130px;
        height: 160px;
        object-fit: cover;
      }
      article h2 {
        font-size: 1.35rem;
      }
      article p {
        margin: 0.2rem 0;
        color: var(--muted);
        font-size: 0.85rem;
      }
      article button {
        border: 0;
        border-bottom: 1px solid;
        background: transparent;
        padding: 0;
        margin-top: 1rem;
      }
      aside {
        padding: 2rem;
        height: max-content;
        position: sticky;
        top: 130px;
      }
      aside p {
        display: flex;
        justify-content: space-between;
      }
      .total {
        font-size: 1.2rem;
      }
      aside small {
        display: block;
        margin-top: 1rem;
        color: var(--muted);
      }
      .empty {
        padding: 5rem;
        text-align: center;
      }
      .empty i {
        font-size: 3rem;
        color: var(--gold);
      }
      .empty h2 {
        margin: 1rem;
      }
      @media (max-width: 800px) {
        .cart-grid {
          grid-template-columns: 1fr;
        }
        aside {
          position: static;
        }
        article {
          grid-template-columns: 90px 1fr;
        }
        article img {
          width: 90px;
          height: 120px;
        }
        article > b {
          grid-column: 2;
        }
      }
    `,
  ],
})
export class Cart {
  constructor(public store: StoreService) {}
}
