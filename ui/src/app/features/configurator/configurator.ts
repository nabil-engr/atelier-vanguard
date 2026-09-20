import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { PRODUCTS } from '../../core/data';
import { StoreService } from '../../core/store.service';

@Component({
  selector: 'app-configurator',
  imports: [FormsModule, CurrencyPipe],
  template: `@if (product(); as p) {
    <section class="studio">
      <div class="preview">
        <img [src]="p.imageUrl" [alt]="p.name" />
        <div>
          <span>{{ p.name }}</span
          ><b>{{ total() | currency: 'USD' : 'symbol' : '1.0-0' }}</b>
        </div>
      </div>
      <div class="panel">
        <span class="eyebrow">CUSTOMIZE</span>
        <h1>{{ p.name }}</h1>
        <div class="steps"><span class="active">1</span><span>2</span><span>3</span></div>
        <section>
          <h2>Fabric</h2>
          <p>Choose the cloth for your garment.</p>
          <div class="options">
            @for (f of fabrics; track f.name) {
              <button
                [class.selected]="fabric() === f.name"
                (click)="fabric.set(f.name); extra.set(f.extra)"
              >
                <i [style.background]="f.color"></i
                ><span
                  >{{ f.name
                  }}<small>+{{ f.extra | currency: 'USD' : 'symbol' : '1.0-0' }}</small></span
                >
              </button>
            }
          </div>
        </section>
        <section>
          <h2>Fit</h2>
          <div class="options compact">
            @for (f of fits; track f) {
              <button [class.selected]="fit() === f" (click)="fit.set(f)">{{ f }}</button>
            }
          </div>
        </section>
        <section>
          <label for="monogram">Monogram <small>(optional)</small></label
          ><input
            id="monogram"
            class="form-control"
            maxlength="12"
            [(ngModel)]="monogram"
            placeholder="Your initials"
          />
        </section>
        <div class="summary">
          <span>Total</span><b>{{ total() | currency: 'USD' : 'symbol' : '1.0-0' }}</b>
        </div>
        <button class="btn-atelier w-100" (click)="add(p)">Add to bag</button>
      </div>
    </section>
  }`,
  styles: [
    `
      .studio {
        min-height: calc(100vh - 106px);
        display: grid;
        grid-template-columns: 58% 42%;
        background: #eee8dc;
      }
      .preview {
        position: sticky;
        top: 106px;
        height: calc(100vh - 106px);
        background: #d8d3ca;
        display: grid;
        place-items: center;
        overflow: hidden;
      }
      .preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .preview > div {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        right: 1rem;
        background: rgba(11, 22, 35, 0.9);
        color: #fff;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
      }
      .panel {
        padding: 3rem clamp(1.25rem, 4vw, 4rem);
        background: var(--paper);
      }
      .panel h1 {
        font-size: 2.6rem;
      }
      .steps {
        display: flex;
        gap: 0.5rem;
        margin: 1.5rem 0 2rem;
      }
      .steps span {
        width: 32px;
        height: 32px;
        border: 1px solid var(--line);
        display: grid;
        place-items: center;
      }
      .steps .active {
        background: var(--gold);
        color: white;
      }
      .panel section {
        border-top: 1px solid var(--line);
        padding: 1.5rem 0;
      }
      .panel h2 {
        font-size: 1.5rem;
      }
      .options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.6rem;
      }
      .options button {
        padding: 1rem;
        text-align: left;
        background: white;
        border: 1px solid var(--line);
        display: flex;
        gap: 0.7rem;
        align-items: center;
      }
      .options button.selected {
        border-color: var(--gold);
        box-shadow: inset 0 0 0 1px var(--gold);
      }
      .options i {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .options small {
        display: block;
        color: var(--muted);
      }
      .compact button {
        justify-content: center;
      }
      .summary {
        display: flex;
        justify-content: space-between;
        padding: 1.2rem 0;
        font-size: 1.2rem;
      }
      @media (max-width: 800px) {
        .studio {
          grid-template-columns: 1fr;
        }
        .preview {
          position: relative;
          top: 0;
          height: 52vh;
        }
        .panel {
          padding: 2rem 1rem;
        }
      }
    `,
  ],
})
export class Configurator {
  product = computed(() =>
    PRODUCTS.find((p) => p.slug === this.route.snapshot.paramMap.get('slug')),
  );
  fabrics = [
    { name: 'Navy Super 150s', color: '#16243a', extra: 0 },
    { name: 'Charcoal Flannel', color: '#4b4c4e', extra: 120 },
    { name: 'Heritage Jamdani', color: '#d5c195', extra: 240 },
    { name: 'Midnight Barathea', color: '#090e17', extra: 160 },
  ];
  fits = ['Slim', 'Tailored', 'Relaxed'];
  fabric = signal(this.fabrics[0].name);
  fit = signal('Tailored');
  extra = signal(0);
  monogram = '';
  total = computed(() => (this.product()?.basePrice ?? 0) + this.extra());
  constructor(
    private route: ActivatedRoute,
    private store: StoreService,
    private router: Router,
  ) {}
  add(p: any) {
    this.store.add(
      { ...p, basePrice: this.total() },
      { fabric: this.fabric(), fit: this.fit(), monogram: this.monogram },
    );
    this.router.navigateByUrl('/cart');
  }
}
