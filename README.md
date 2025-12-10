# Velora Angular Ecommerce

A modern, responsive ecommerce web app built with Angular 20, Tailwind CSS 4, and SSRready Express. It features authentication, product catalog, cart and checkout, modular layouts, and a clean UI consistent with a custom Tailwind theme.

![Angular](https://img.shields.io/badge/Angular-20.x-dd0031?logo=angular&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-0ea5e9?logo=tailwindcss&logoColor=white)
![SSR](https://img.shields.io/badge/SSR-Enabled-22c55e)

---

## Live Demo

Link:  [Demo](https://ecommerce-velora.netlify.app/)

---

## Table of Contents

- Introduction
- Features
- Tech Stack
- Architecture Overview
- Layouts
- Authentication & Authorization (JWT, Cookies, jwt-decode)
- Interceptors (Headers, Loading)
- Routing
- Styling & Theme (Tailwind 4 + Flowbite)
- Folder Structure
- Installation & Setup
- Environment Configuration
- Usage Tips
- SSR & Deployment
- Tests
- Code Style & Tooling
- Contributing
- License
- Credits
- Future / Upcoming Enhancements

---

## Features

- Authentication: Login, Register, Forgot Password
- Protected Routes: `authGuard`, `isloggedinGuard`
- Product Catalog: Listing, categories, brands
- Product Details: Dedicated details view
- Cart: Add/update/remove, clear cart
- Checkout: Session flow (`/orders/checkout-session/:cartId`)
- Orders: View all orders
- Content Pages: Newsletter, FAQs, Contact Us
- UI/UX: Tailwind CSS 4, Flowbite theme, Font Awesome icons
- Feedback: `ngx-toastr` toasts, global `ngx-spinner` loader
- Pagination: `ngx-pagination`
- Carousel: `ngx-owl-carousel-o`
- SSR-ready: Express server for server-side rendering
- Consistent theming tokens: `text-heading`, `text-body`, `bg-neutral-primary-soft`, `border-default`, `rounded-base`, brand `var(--main-color)`

---

## Tech Stack

- Framework: Angular 20 (Standalone API), Router, RxJS
- Styling: Tailwind CSS 4.1, Flowbite plugin/theme, PostCSS
- UI Libraries: Font Awesome, `ngx-owl-carousel-o`, `ngx-pagination`, `ngx-toastr`, `ngx-spinner`
- Auth/State: `ngx-cookie-service`, `jwt-decode`
- SSR: `@angular/ssr`, Express server (`src/server.ts`)
- Tooling: Angular CLI 20.3.6, TypeScript 5.9, Karma/Jasmine
- API: `https://ecommerce.routemisr.com/api/v1` (configured in environment files)

---

## Architecture Overview

- Standalone Angular app using provider-based configuration in `app.config.ts`.
- Clear separation of concerns:
  - `core/` for authentication, guards, interceptors, layouts, and shared services.
  - `features/` for page-level features (home, products, details, cart, checkout, etc.).
  - `shared/components/` for reusable UI (navbar, footer, input with floating labels, card).
- HTTP handled via Angular `HttpClient` with interceptors for auth headers and loading.
- SSR support via Express (`src/server.ts`) and `@angular/ssr`.

## Layouts

- **AnonLayoutComponent**
  - Hosts public/auth pages: `/login`, `/register`, `/forgotpassword`.
  - Guarded by `isloggedinGuard` to prevent logged-in users from seeing auth pages.
- **UserLayoutComponent**
  - Hosts authenticated area: `/home`, `/products`, `/details/:id`, `/cart`, `/checkout/:cartId`, `/categories`, `/brands`, `/allorders`, `/newsletter`, `/faq`, `/contactus`.
  - Guarded by `authGuard` to require authentication.
- Layouts render `app-navbar` and `<router-outlet>` for consistent shell.

## Authentication & Authorization (JWT, Cookies, jwt-decode)

- Token storage: Auth token is stored as a cookie named `token` via `ngx-cookie-service`.
- JWT decoding: `jwt-decode` is used (e.g., orders) to safely read user info from the cookie token.
- Auth endpoints (via `AuthService`, using `environment.baseUrl`):
  - `POST /auth/signup`, `POST /auth/signin`
  - Password flow: `POST /auth/forgotPasswords`, `POST /auth/verifyResetCode`, `PUT /auth/resetPassword`
- Logout: `AuthService.signOut()` deletes the `token` cookie and navigates to `/login`.
- Guards:
  - `authGuard` protects main user routes.
  - `isloggedinGuard` redirects authenticated users away from auth pages.

---

## Interceptors (Headers, Loading)

- **Headers interceptor** adds `token` header when calling protected endpoints (cart, wishlist, orders), using the cookie value.
- **Loading interceptor** shows `ngx-spinner` for each HTTP request and hides it on finalize.
  - Ensure `<ngx-spinner></ngx-spinner>` exists in a root template (e.g., `app.html`) so the overlay can render.

---

## Routing

Defined in `src/app/app.routes.ts`:

- Public (Anon layout): `/login`, `/register`, `/forgotpassword`
- Authenticated (User layout): `/home`, `/products`, `/details/:id`, `/cart`, `/checkout/:cartId`, `/categories`, `/brands`, `/allorders`, `/newsletter`, `/faq`, `/contactus`
- Wildcard: `**` Not Found

---

## Styling & Theme (Tailwind 4 + Flowbite)

- Tailwind v4 wired via `src/styles.css`:
  - `@import "tailwindcss";`
  - `@import "flowbite/src/themes/default";`
  - `@plugin "flowbite/plugin";`
  - `@source "../node_modules/flowbite";`
- Theme tokens:
  - `:root` brand color `--main-color: #79B38A`
  - Utilities: `main-input`, `main-label`, `.btn`, `.card`
  - Fonts: Body Karla, Logo Dancing Script
- Token usage across UI: `text-heading`, `text-body`, `bg-neutral-primary-soft`, `border-default`, `rounded-base`, `bg-(--main-color)`

---

## Folder Structure (excerpt)

```
Velora/
 angular.json
 package.json
 public/
   images/
 src/
   app/
     app.config.ts         # providers (router, http, interceptors, animations, toastr)
     app.html              # <router-outlet> + <app-footer>
     app.routes.ts         # routes & lazy-loaded components
     core/
       auth/              # login, register, forgotpassword
       guard/             # authGuard, isloggedinGuard
       interceptors/      # headers, loading
       layout/            # anon & user layouts, navbar/footer
       services/          # products, categories, checkout, etc.
     features/             # home, products, details, cart, checkout, etc.
     shared/components/    # navbar, footer, input (floating label), card
   environments/            # environment.ts, environment.development.ts
   server.ts                # Express SSR server
   styles.css               # Tailwind + Flowbite + theme tokens
 README.md
```

---

## Installation & Setup

Prereqs: Node.js 18+, npm

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run start    # ng serve
# open http://localhost:4200
```

Build for production:

```bash
npm run build    # ng build
```

Unit tests:

```bash
npm run test     # ng test (Karma/Jasmine)
```

SSR serve (after build):

```bash
npm run build
npm run serve:ssr:recapv2   # node dist/recapv2/server/server.mjs
# open http://localhost:4000
```

Scripts:

- `start`: `ng serve`
- `build`: `ng build`
- `watch`: `ng build --watch --configuration development`
- `test`: `ng test`
- `serve:ssr:recapv2`: `node dist/recapv2/server/server.mjs`

---

## Environment Configuration

- Angular environments:
  - `src/environments/environment.ts`
  - `src/environments/environment.development.ts`

Current:

```ts
export const environment = {
  baseUrl: 'https://ecommerce.routemisr.com/api/v1',
};
```

SSR server:

- `PORT` (optional) `src/server.ts` reads `process.env.PORT`, defaults to 4000

Example `.env.example` (only if you introduce runtime vars):

```bash
# Optional if you wire process.env into Angular/SSR
PORT=4000
API_BASE_URL=https://ecommerce.routemisr.com/api/v1
```

---

## Usage Tips

- Many routes are protected ensure youre authenticated or mock a `token` cookie.
- Toastr requires animations already provided via `provideAnimations()`.
- Loading spinner needs `<ngx-spinner></ngx-spinner>` present in a root template.

---

## SSR & Deployment

- Build the universal bundle with `npm run build`.
- Run `npm run serve:ssr:recapv2` to start the Express SSR server (default port 4000).
- Configure `PORT` for hosting environments.

---

## Tests

- Unit tests via Karma/Jasmine:
  - `npm run test`
- e2e tests not configured yet.

---

## Code Style & Tooling

- Angular CLI 20.3.6
- TypeScript 5.9
- Prettier (from package.json): `printWidth: 100`, `singleQuote: true`, HTML parser: `angular`
- Tailwind 4 + Flowbite configured via `src/styles.css` (no root tailwind.config.js)

---

## Contributing

- Fork Branch PR
- Follow existing style and token usage
- Keep UI consistent with the Tailwind theme and utilities

---

## License

MIT (placeholder)

---

## Future / Upcoming Enhancements

- **Translation (multi-language) planned**
- **Light & Dark mode toggle planned**
- Contact / FAQ / Newsletter pages planned
- Unit tests and e2e tests
- SEO and performance improvements
