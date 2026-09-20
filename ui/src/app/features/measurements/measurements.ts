import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-measurements',
  imports: [FormsModule],
  template: `<section class="measure">
    <div class="intro">
      <span class="eyebrow">YOUR FIT</span>
      <h1>Save your measurements</h1>
      <p>Use a soft tape. Keep it level and do not pull tight.</p>
      <div class="method">
        <i class="bi bi-person-standing"></i
        ><span><b>Measure yourself</b><small>About 10 minutes</small></span>
      </div>
      <div class="method">
        <i class="bi bi-camera-video"></i
        ><span><b>Book a video fitting</b><small>A tailor guides you</small></span>
      </div>
    </div>
    <form #f="ngForm" (ngSubmit)="save(f.valid)">
      <div class="form-head">
        <span>Measurement profile</span
        ><button type="button" (click)="unit.set(unit() === 'cm' ? 'in' : 'cm')">
          {{ unit() }}
        </button>
      </div>
      <label>Profile name</label
      ><input class="form-control" name="name" [(ngModel)]="name" required />
      <div class="grid">
        @for (field of fields; track field.key) {
          <div>
            <label [for]="field.key">{{ field.label }}</label>
            <div class="input-group">
              <input
                class="form-control"
                type="number"
                [id]="field.key"
                [name]="field.key"
                [(ngModel)]="field.value"
                required
                min="1"
              /><span class="input-group-text">{{ unit() }}</span>
            </div>
            <small>{{ field.tip }}</small>
          </div>
        }
      </div>
      <label>Fit preference</label
      ><select class="form-select" name="fit" [(ngModel)]="fit">
        <option>Slim</option>
        <option>Tailored</option>
        <option>Relaxed</option></select
      ><button class="btn-atelier mt-4" type="submit">Save for review</button>
      @if (saved()) {
        <div class="saved">
          <i class="bi bi-check2-circle"></i> Saved. A tailor will review this profile.
        </div>
      }
      @if (error()) {
        <div class="text-danger mt-2">Complete every measurement.</div>
      }
    </form>
  </section>`,
  styles: [
    `
      .measure {
        display: grid;
        grid-template-columns: 0.75fr 1.25fr;
        min-height: 75vh;
      }
      .intro {
        background: var(--navy);
        color: white;
        padding: clamp(3rem, 7vw, 7rem);
      }
      .intro h1 {
        color: white;
        font-size: clamp(3rem, 5vw, 5rem);
        line-height: 1;
      }
      .intro > p {
        color: #c9cbd0;
      }
      .method {
        display: flex;
        gap: 1rem;
        padding: 1rem 0;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
      }
      .method i {
        color: var(--gold);
        font-size: 1.5rem;
      }
      .method span {
        display: flex;
        flex-direction: column;
      }
      .method small {
        color: #aeb4bb;
      }
      form {
        padding: clamp(2rem, 6vw, 6rem);
        max-width: 900px;
      }
      .form-head {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid var(--line);
        padding-bottom: 1rem;
        margin-bottom: 2rem;
      }
      .form-head button {
        border: 1px solid var(--navy);
        background: transparent;
        padding: 0.35rem 0.8rem;
        text-transform: uppercase;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.3rem;
        margin: 1.5rem 0;
      }
      .grid small {
        color: var(--muted);
        font-size: 0.72rem;
      }
      label {
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        font-size: 0.7rem;
        margin-bottom: 0.4rem;
      }
      .saved {
        padding: 1rem;
        margin-top: 1rem;
        background: #e2eee7;
        color: #1f6038;
      }
      @media (max-width: 800px) {
        .measure {
          grid-template-columns: 1fr;
        }
        .intro,
        form {
          padding: 3rem 1rem;
        }
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class Measurements {
  name = 'My measurements';
  unit = signal('cm');
  fit = 'Tailored';
  saved = signal(false);
  error = signal(false);
  fields = [
    { key: 'chest', label: 'Chest', tip: 'Around the fullest part', value: null },
    { key: 'waist', label: 'Waist', tip: 'At your natural waist', value: null },
    { key: 'hip', label: 'Hip', tip: 'Around the fullest part', value: null },
    { key: 'shoulder', label: 'Shoulder', tip: 'Point to point across back', value: null },
    { key: 'sleeve', label: 'Sleeve', tip: 'Shoulder to wrist', value: null },
    { key: 'inseam', label: 'Inseam', tip: 'Crotch to ankle', value: null },
  ];
  save(valid: any) {
    this.saved.set(!!valid);
    this.error.set(!valid);
  }
}
