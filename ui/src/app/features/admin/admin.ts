import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `<div class="admin">
    <aside>
      <div class="admin-brand">AV <span>OPERATIONS</span></div>
      @for (n of nav; track n.label) {
        <button [class.active]="active() === n.label" (click)="active.set(n.label)">
          <i [class]="'bi ' + n.icon"></i>{{ n.label }}
        </button>
      }
    </aside>
    <main>
      <header>
        <div>
          <span class="eyebrow">ATELIER OPERATIONS</span>
          <h1>{{ active() }}</h1>
        </div>
        <div class="user">AR <span>Admin</span></div>
      </header>
      @if (active() === 'Overview') {
        <div class="metrics">
          @for (m of metrics; track m.label) {
            <article>
              <span>{{ m.label }}</span
              ><b>{{ m.value }}</b
              ><small>{{ m.note }}</small>
            </article>
          }
        </div>
        <div class="admin-grid">
          <section class="surface">
            <div class="section-head">
              <h2>Production</h2>
              <span>38 active orders</span>
            </div>
            <div class="pipeline">
              @for (s of pipeline; track s.name) {
                <div>
                  <b>{{ s.count }}</b
                  ><span>{{ s.name }}</span
                  ><i [style.width.%]="s.count * 7"></i>
                </div>
              }
            </div>
          </section>
          <section class="surface">
            <div class="section-head">
              <h2>Today</h2>
              <span>3 fittings</span>
            </div>
            @for (a of appointments; track a.time) {
              <div class="appointment">
                <b>{{ a.time }}</b
                ><span
                  >{{ a.name }}<small>{{ a.type }}</small></span
                >
              </div>
            }
          </section>
          <section class="surface orders">
            <div class="section-head">
              <h2>Orders needing attention</h2>
              <button>View all</button>
            </div>
            <div class="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Garment</th>
                    <th>Issue</th>
                    <th>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  @for (o of orders; track o.id) {
                    <tr>
                      <td>{{ o.id }}</td>
                      <td>{{ o.customer }}</td>
                      <td>{{ o.item }}</td>
                      <td>
                        <span class="status">{{ o.issue }}</span>
                      </td>
                      <td>{{ o.owner }}</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </section>
        </div>
      } @else {
        <section class="surface placeholder">
          <i class="bi bi-grid"></i>
          <h2>{{ active() }}</h2>
          <p>This workspace is ready for API data.</p>
          <button class="btn-atelier">Add new</button>
        </section>
      }
    </main>
  </div>`,
  styles: [
    `
      .admin {
        display: grid;
        grid-template-columns: 240px 1fr;
        min-height: 100vh;
        background: #f1ede5;
        margin-top: -106px;
        position: relative;
        z-index: 100;
      }
      .admin > aside {
        background: #f8f4ec;
        border-right: 1px solid var(--line);
        padding: 1.5rem 0.8rem;
      }
      .admin-brand {
        font-family: var(--serif);
        letter-spacing: 0.15em;
        padding: 1rem;
      }
      .admin-brand span {
        display: block;
        font-family: var(--sans);
        font-size: 0.6rem;
        color: var(--gold);
        margin-top: 0.4rem;
      }
      .admin > aside button {
        width: 100%;
        border: 0;
        background: transparent;
        text-align: left;
        padding: 0.85rem;
        color: #555;
      }
      .admin > aside button i {
        margin-right: 0.8rem;
      }
      .admin > aside button.active {
        background: var(--navy);
        color: white;
      }
      .admin main {
        padding: 2rem;
        max-width: 1500px;
        width: 100%;
        margin: auto;
      }
      .admin header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }
      .admin h1 {
        font-size: 2.8rem;
      }
      .user {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--navy);
        color: white;
        padding: 0.6rem;
      }
      .user span {
        font-size: 0.75rem;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
      }
      .metrics article {
        background: var(--paper);
        padding: 1.5rem;
        border: 1px solid var(--line);
        display: flex;
        flex-direction: column;
      }
      .metrics span,
      .metrics small {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--muted);
      }
      .metrics b {
        font-family: var(--serif);
        font-size: 2.2rem;
        margin: 0.8rem 0;
      }
      .admin-grid {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 1rem;
        margin-top: 1rem;
      }
      .admin-grid section {
        padding: 1.5rem;
      }
      .section-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.2rem;
      }
      .section-head h2 {
        margin: 0;
      }
      .section-head span {
        font-size: 0.75rem;
        color: var(--muted);
      }
      .pipeline {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;
      }
      .pipeline > div {
        padding: 1rem;
        background: #f4efe6;
        display: flex;
        flex-direction: column;
      }
      .pipeline b {
        font-family: var(--serif);
        font-size: 1.8rem;
      }
      .pipeline span {
        font-size: 0.72rem;
        min-height: 40px;
      }
      .pipeline i {
        height: 3px;
        background: var(--gold);
        margin-top: 1rem;
      }
      .appointment {
        display: grid;
        grid-template-columns: 60px 1fr;
        padding: 1rem 0;
        border-top: 1px solid var(--line);
      }
      .appointment > b {
        color: var(--gold-dark);
      }
      .appointment small {
        display: block;
        color: var(--muted);
      }
      .orders {
        grid-column: 1/-1;
      }
      .orders table {
        width: 100%;
      }
      .orders th,
      .orders td {
        padding: 0.8rem;
        border-bottom: 1px solid var(--line);
        font-size: 0.8rem;
      }
      .orders th {
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 0.65rem;
      }
      .status {
        color: #b42318;
        background: #fee4e2;
        padding: 0.3rem;
      }
      .placeholder {
        padding: 6rem;
        text-align: center;
      }
      .placeholder i {
        font-size: 3rem;
        color: var(--gold);
      }
      @media (max-width: 950px) {
        .admin {
          grid-template-columns: 70px 1fr;
        }
        .admin-brand span,
        .admin > aside button {
          font-size: 0;
        }
        .admin > aside button i {
          font-size: 1rem;
          margin: 0;
        }
        .metrics {
          grid-template-columns: 1fr 1fr;
        }
        .admin-grid {
          grid-template-columns: 1fr;
        }
        .pipeline {
          grid-template-columns: 1fr 1fr;
        }
        .admin main {
          padding: 1rem;
        }
      }
      @media (max-width: 550px) {
        .metrics {
          grid-template-columns: 1fr;
        }
        .admin {
          grid-template-columns: 54px 1fr;
        }
        .admin h1 {
          font-size: 2rem;
        }
      }
    `,
  ],
})
export class Admin {
  active = signal('Overview');
  nav = [
    { label: 'Overview', icon: 'bi-grid' },
    { label: 'Orders', icon: 'bi-bag' },
    { label: 'Production', icon: 'bi-kanban' },
    { label: 'Measurements', icon: 'bi-rulers' },
    { label: 'Products', icon: 'bi-box' },
    { label: 'Fabrics', icon: 'bi-layers' },
    { label: 'Customers', icon: 'bi-people' },
    { label: 'Alterations', icon: 'bi-scissors' },
    { label: 'Reports', icon: 'bi-bar-chart' },
    { label: 'Settings', icon: 'bi-sliders' },
  ];
  metrics = [
    { label: 'Revenue this month', value: '$284,500', note: '+18.4% from last month' },
    { label: 'Active orders', value: '42', note: '6 due this week' },
    { label: 'Measurements to review', value: '7', note: '2 priority' },
    { label: 'Low-stock fabrics', value: '3', note: 'Reorder required' },
  ];
  pipeline = [
    { name: 'Measurements', count: 6 },
    { name: 'Cutting', count: 4 },
    { name: 'Tailoring', count: 9 },
    { name: 'Quality check', count: 5 },
    { name: 'Ready to ship', count: 3 },
  ];
  appointments = [
    { time: '10:00', name: 'Lord Sterling', type: 'Fit review' },
    { time: '13:30', name: 'Nadia Rahman', type: 'First fitting' },
    { time: '16:00', name: 'Marc Evans', type: 'Fabric consult' },
  ];
  orders = [
    {
      id: 'AV-10428',
      customer: 'Lord Sterling',
      item: 'Mayfair suit',
      issue: 'Shoulder check',
      owner: 'A. Vance',
    },
    {
      id: 'AV-10421',
      customer: 'Rajiv Sen',
      item: 'Jamdani tuxedo',
      issue: 'Fabric delay',
      owner: 'T. Rahman',
    },
    {
      id: 'AV-10409',
      customer: 'Emma Laurent',
      item: 'Silk dress',
      issue: 'Measurement review',
      owner: 'N. Akter',
    },
  ];
}
