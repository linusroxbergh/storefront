# Storefront

Fernhill's shop front. Vite, React 19, React Router; no backend of its own. Checkout charges cards through payments-api, which `vite.config.ts` proxies at `/api` to localhost:8787.

## Commands

- `pnpm dev`: app on localhost:5173
- `pnpm test`: unit tests (Vitest, `src/**/*.test.ts`)
- `pnpm typecheck`
- `pnpm e2e`: Playwright against a production build; stubs `/api`

## Conventions

- Money is integer cents everywhere. Format only at the edge, with `formatMoney`.
- Cart maths lives in `src/lib/cart.ts` and stays pure; components read it through `useCart()`.
- New UI goes behind a flag in `src/lib/flags.ts` until it ships. Add the flag to the README table.
- A bug fix comes with a test that fails without it.
- PRs: TL;DR, what changes for users, reviewer notes, verification.
