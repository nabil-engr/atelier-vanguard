import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StoreService } from './core/store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly menuOpen = signal(false);
  constructor(protected store: StoreService) {}
  protected toggleMenu() {
    this.menuOpen.update((value) => !value);
  }
}
