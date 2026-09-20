import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { PRODUCTS } from '../../core/data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CurrencyPipe],
  template: `
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-shade"></div>
      <div class="hero-content">
        <span class="eyebrow">HANDCRAFTED IN DHAKA · DELIVERED WORLDWIDE</span>
        <h1>Made for you.<br /><em>Built to last.</em></h1>
        <p>Custom clothing cut to your measurements from exceptional cloth.</p>
        <div class="d-flex gap-3 flex-wrap">
          <a routerLink="/shop" class="btn-atelier">Shop the collection</a
          ><a routerLink="/booking" class="hero-outline">Book a fitting</a>
        </div>
      </div>
    </section>
    <section class="section container-wide">
      <div class="row align-items-end mb-5">
        <div class="col-lg-7">
          <span class="eyebrow">THE COLLECTION</span>
          <h2 class="section-title">Tailored for real life</h2>
        </div>
        <div class="col-lg-5">
          <p class="muted mb-0">
            Choose a garment, personalize the details, then add your measurements.
          </p>
        </div>
      </div>
      <div class="row g-3 categories">
        <a routerLink="/shop" [queryParams]="{ category: 'Suits' }" class="col-md-7 category men"
          ><span>Men's tailoring</span><b>Suits, shirts and trousers</b></a
        >
        <a
          routerLink="/shop"
          [queryParams]="{ category: 'Dresses' }"
          class="col-md-5 category women"
          ><span>Women's atelier</span><b>Dresses made to your fit</b></a
        >
      </div>
    </section>
    <section class="section steps">
      <div class="container-wide">
        <span class="eyebrow">HOW IT WORKS</span>
        <h2 class="section-title mb-5">Three simple steps</h2>
        <div class="row g-0">
          <div class="col-md-4 step">
            <b>01</b>
            <h3>Choose</h3>
            <p>Select a garment and fabric.</p>
          </div>
          <div class="col-md-4 step">
            <b>02</b>
            <h3>Personalize</h3>
            <p>Adjust the cut and finishing details.</p>
          </div>
          <div class="col-md-4 step">
            <b>03</b>
            <h3>Measure</h3>
            <p>Use our guide or book a video fitting.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section container-wide">
      <div class="d-flex justify-content-between align-items-end mb-4">
        <div>
          <span class="eyebrow">FEATURED</span>
          <h2 class="section-title mb-0">Signature pieces</h2>
        </div>
        <a routerLink="/shop" class="simple-link">View all →</a>
      </div>
      <div class="row g-4">
        @for (p of products; track p.id) {
          <a class="col-sm-6 col-lg-3 product" [routerLink]="['/product', p.slug]"
            ><img [src]="p.imageUrl" [alt]="p.name" /><span>{{ p.category }}</span>
            <h3>{{ p.name }}</h3>
            <p>{{ p.basePrice | currency: 'USD' : 'symbol' : '1.0-0' }}</p></a
          >
        }
      </div>
    </section>
    <section class="consult">
      <div>
        <span class="eyebrow">NEED HELP WITH FIT?</span>
        <h2>Book a private video fitting</h2>
        <p>A tailor will guide your measurements in a 20-minute appointment.</p>
        <a routerLink="/booking" class="btn-atelier">Choose a time</a>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        min-height: 78vh;
        position: relative;
        display: flex;
        align-items: center;
        color: white;
        overflow: hidden;
      }
      .hero-bg {
        position: absolute;
        inset: 0;
        background: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCiEcCh09AKJTvsDjnPHtNqhFGPHgjjIhFx3CGy3NnM1TatvJ2RAj-0zlc1ycjv4xxcUyOb0xoCJVp-6oe_mVnck3M2cYHHJBTuq5Mehc9BjgPEJKjaThVRPGyDn8w5tGyu0bhDNcIosRA1-qpA7uQtRXApkAMHFerIJgeFfeR6eW1t_x687IzgeNadSEbVhD7F-hGHd-lC2dV1gS1ddvOv3Y1W8UOmq1fpo82xxDAAn2C8QJTHPf7h')
          center/cover;
      }
      .hero-shade {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(4, 10, 17, 0.92), rgba(4, 10, 17, 0.35));
      }
      .hero-content {
        position: relative;
        width: min(1360px, calc(100% - 2rem));
        margin: auto;
      }
      .hero .eyebrow {
        color: #d8b97f;
      }
      .hero h1 {
        color: #fff;
        font-size: clamp(3rem, 7vw, 6.5rem);
        line-height: 0.98;
        margin: 1.2rem 0;
      }
      .hero h1 em {
        color: #d8b97f;
        font-weight: 400;
      }
      .hero p {
        font-size: 1.1rem;
        max-width: 540px;
        margin-bottom: 2rem;
      }
      .hero-outline {
        min-height: 50px;
        padding: 0.8rem 1.75rem;
        border: 1px solid white;
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        font-size: 0.72rem;
        display: flex;
        align-items: center;
      }
      .category {
        min-height: 430px;
        padding: 2.5rem !important;
        display: flex;
        flex-direction: column;
        justify-content: end;
        color: white;
        text-decoration: none;
        background-position: center;
        background-size: cover;
        box-shadow: inset 0 -180px 130px rgba(0, 0, 0, 0.65);
      }
      .category span {
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 0.7rem;
      }
      .category b {
        font-family: var(--serif);
        font-size: 2rem;
        font-weight: 400;
      }
      .men {
        background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuABPCrrvVMaSV_jIdOvdlmwu8rtwCQz7AxFMotXUspQEewiVFvvrx2uje2P80Sx9-r6sHtfhIfFOVSaPKybjbH35MMmJ0Slrh-hgUuo34IQxvVXVnMrbeuDy1xxPeXVhF87drxC97aiV_X9d31tNyvqDVEAOTsQQT4YgVPD9anqFT0VLs_C1Ok1rc2_VmX7LlfvHNt_WMageaI6hvJdP-yN2M6SIRfztMVoh4gj1BvmL5tkNmcZ1pqj');
      }
      .women {
        background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaS2yV_u-WrUsNTK_d_yE8YsJE3mqQ_FuLz0m1jRQdMm1QfiB_QyLsdgWVN_mVnBmL-LTVKa_hxJjlxWOCJxU_ol1XT-EEpwjxGxhzlgFNo2-bkjeCvb4BJruCyKEWTR1r6RkLQ-Be93WTvysUo18KQk_gQOeGqI8LWGZtBL9ATkX9FLb0PUe3QzA2DD7tHk4gUkJMJn8MmZboiLklU70-KK2uWbAqYs0JwwtXDpqPHe5-ayS7wvZz');
      }
      .steps {
        background: #eee8dc;
      }
      .step {
        padding: 2rem;
        border: 1px solid var(--line);
      }
      .step > b {
        color: var(--gold);
        font-family: var(--serif);
        font-size: 2rem;
      }
      .step h3 {
        font-size: 1.6rem;
        margin-top: 1.5rem;
      }
      .product {
        color: inherit;
        text-decoration: none;
      }
      .product img {
        width: 100%;
        aspect-ratio: 4/5;
        object-fit: cover;
        background: #e6e0d5;
      }
      .product span {
        display: block;
        margin-top: 1rem;
        color: var(--gold-dark);
        font-size: 0.65rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
      }
      .product h3 {
        font-size: 1.2rem;
        margin: 0.5rem 0;
      }
      .simple-link {
        color: var(--navy);
        text-decoration: none;
      }
      .consult {
        padding: 5rem 1rem;
        background: var(--navy);
        color: white;
        text-align: center;
      }
      .consult > div {
        max-width: 650px;
        margin: auto;
      }
      .consult h2 {
        color: white;
        font-size: clamp(2rem, 4vw, 3.5rem);
      }
      .consult p {
        color: #c9cbd0;
        margin-bottom: 2rem;
      }
    `,
  ],
})
export class Home {
  products = PRODUCTS;
}
