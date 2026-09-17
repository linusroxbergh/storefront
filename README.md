# Storefront

The shop at fernhill.example: ceramics, linen and other good things for the kitchen and table.

Vite, React 19 and React Router. There's no backend here; checkout charges cards through [payments-api](https://github.com/linusroxbergh/payments-api).

## Run it

```sh
pnpm install
pnpm dev
```

The app runs on http://localhost:5173. Start payments-api on port 8787 too, or orders fail at the last step.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Dev server with hot reload |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm typecheck` | TypeScript, no emit |
| `pnpm build` | Production build in `dist/` |

## Feature flags

Flags live in `src/lib/flags.ts` and read `VITE_FLAG_*` variables. Put overrides in `.env.local`, which git ignores.

| Flag | Default | Variable |
| --- | --- | --- |
| `newBadges` | on | `VITE_FLAG_NEW_BADGES` |

## Test cards

| Number | Result |
| --- | --- |
| 4242 4242 4242 4242 | Succeeds |
| 4000 0000 0000 0002 | Declined |
