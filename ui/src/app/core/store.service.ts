import { Injectable, computed, signal } from '@angular/core';
import { CartItem, Product } from './models';

@Injectable({ providedIn: 'root' })
export class StoreService {
  readonly cart = signal<CartItem[]>(this.read());
  readonly count = computed(() => this.cart().reduce((sum, x) => sum + x.quantity, 0));
  readonly subtotal = computed(() =>
    this.cart().reduce((sum, x) => sum + x.product.basePrice * x.quantity, 0),
  );

  add(product: Product, options?: Partial<CartItem>) {
    this.cart.update((items) => [
      ...items,
      {
        product,
        fabric: options?.fabric ?? product.fabric,
        fit: options?.fit ?? 'Tailored',
        monogram: options?.monogram ?? '',
        quantity: 1,
      },
    ]);
    this.persist();
  }
  remove(index: number) {
    this.cart.update((items) => items.filter((_, i) => i !== index));
    this.persist();
  }
  clear() {
    this.cart.set([]);
    this.persist();
  }
  private persist() {
    localStorage.setItem('atelier-cart', JSON.stringify(this.cart()));
  }
  private read(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem('atelier-cart') ?? '[]');
    } catch {
      return [];
    }
  }
}
