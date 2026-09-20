import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../core/store.service';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CurrencyPipe, RouterLink],
  template: `<section class="container-wide section">
    <a routerLink="/cart" class="back">← Back to bag</a>
    <div class="checkout">
      <form #f="ngForm" (ngSubmit)="place(f.valid)">
        <span class="eyebrow">SECURE CHECKOUT</span>
        <h1>Delivery and payment</h1>
        <div class="steps">
          <b>1</b><span>Delivery</span><b>2</b><span>Payment</span><b>3</b><span>Review</span>
        </div>
        <h2>Contact</h2>
        <label>Email</label
        ><input
          class="form-control"
          type="email"
          name="email"
          [(ngModel)]="model.email"
          required
          email
        />
        <h2>Delivery address</h2>
        <div class="row g-3">
          <div class="col-md-6">
            <label>First name</label
            ><input class="form-control" name="first" [(ngModel)]="model.first" required />
          </div>
          <div class="col-md-6">
            <label>Last name</label
            ><input class="form-control" name="last" [(ngModel)]="model.last" required />
          </div>
          <div class="col-12">
            <label>Address</label
            ><input class="form-control" name="address" [(ngModel)]="model.address" required />
          </div>
          <div class="col-md-7">
            <label>City</label
            ><input class="form-control" name="city" [(ngModel)]="model.city" required />
          </div>
          <div class="col-md-5">
            <label>Country</label
            ><select class="form-select" name="country" [(ngModel)]="model.country">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Bangladesh</option>
              <option>France</option>
            </select>
          </div>
        </div>
        <h2>Payment</h2>
        <div class="payment">
          <i class="bi bi-credit-card"></i><span>Secure card payment</span
          ><small>Card details are handled by the payment provider.</small>
        </div>
        <button class="btn-atelier w-100" type="submit">
          Place order · {{ store.subtotal() | currency: 'USD' : 'symbol' : '1.0-0' }}
        </button>
        @if (error()) {
          <p class="text-danger mt-2">Please complete the required fields.</p>
        }
      </form>
      <aside>
        <h2>Order summary</h2>
        @for (item of store.cart(); track $index) {
          <div class="item">
            <img [src]="item.product.imageUrl" /><span
              >{{ item.product.name }}<small>{{ item.fabric }}</small></span
            ><b>{{ item.product.basePrice | currency: 'USD' : 'symbol' : '1.0-0' }}</b>
          </div>
        }
        <hr />
        <p>
          <span>Total</span><b>{{ store.subtotal() | currency: 'USD' : 'symbol' : '1.0-0' }}</b>
        </p>
      </aside>
    </div>
  </section>`,
  styles: [
    `
      .back {
        color: var(--muted);
        text-decoration: none;
      }
      .checkout {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 5rem;
        margin-top: 2rem;
      }
      form {
        max-width: 720px;
      }
      h1 {
        font-size: 3.5rem;
      }
      h2 {
        font-size: 1.35rem;
        margin: 2rem 0 1rem;
      }
      label {
        font-size: 0.72rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        margin-bottom: 0.35rem;
      }
      .steps {
        display: flex;
        align-items: center;
        gap: 0.7rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--line);
      }
      .steps b {
        width: 28px;
        height: 28px;
        background: var(--navy);
        color: white;
        display: grid;
        place-items: center;
      }
      .steps span {
        margin-right: 1rem;
        font-size: 0.8rem;
      }
      .payment {
        border: 1px solid var(--gold);
        padding: 1rem;
        margin-bottom: 1rem;
        display: grid;
        grid-template-columns: 30px 1fr;
      }
      .payment small {
        grid-column: 2;
        color: var(--muted);
      }
      aside {
        background: #eee8dc;
        padding: 2rem;
        height: max-content;
      }
      .item {
        display: grid;
        grid-template-columns: 60px 1fr auto;
        gap: 1rem;
        align-items: center;
        margin: 1rem 0;
      }
      .item img {
        width: 60px;
        height: 75px;
        object-fit: cover;
      }
      .item small {
        display: block;
        color: var(--muted);
      }
      aside p {
        display: flex;
        justify-content: space-between;
      }
      @media (max-width: 850px) {
        .checkout {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        aside {
          grid-row: 1;
        }
        h1 {
          font-size: 2.6rem;
        }
      }
    `,
  ],
})
export class Checkout {
  model = { email: '', first: '', last: '', address: '', city: '', country: 'United States' };
  error = signal(false);
  constructor(
    public store: StoreService,
    private router: Router,
  ) {}
  place(valid: any) {
    if (!valid || !this.store.cart().length) {
      this.error.set(true);
      return;
    }
    this.store.clear();
    this.router.navigateByUrl('/order-confirmation');
  }
}
