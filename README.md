# Puzzles (TypeScript)

Test-first solutions for [Advent of Code](https://adventofcode.com) and [Everybody Codes](https://everybody.codes), sharing one set of extension methods and helpers via a pnpm workspace.

## Layout

- `packages/utils` – `@puzzles/utils`: Array/String/Map/Number extensions, the global `Pos` type, file/position/direction/maths helpers, linked list
- `advent-of-code/<year>` – one project per year (`aoc-<year>`), days under `src/dayN` with `input.txt`
- `everybody-codes/<year>` – one project per event (`ec-<year>`), days under `src/dayN` with `notes1-3.txt`
- `templates/` – the starter day files used by `pnpm new`

## Commands

- `pnpm install`
- `pnpm new aoc 2024 1` – scaffold a day (and the year's project if new; then run `pnpm install`)
- `pnpm new ec 2025 1`
- `pnpm test` – typecheck and run every project once (carries on past failing projects)
- `pnpm --filter aoc-2018 test` – typecheck and watch one project (or run `pnpm test` inside its folder)
- `pnpm lint` / `pnpm format`

## Using the utilities

```ts
import { readTestData, Position } from "@puzzles/utils";
```

Importing the package installs the prototype extensions, so `.sum()`, `.chunk()` etc. are then available. `@puzzles/utils` points straight at its TypeScript source, so there is no build step: a change to a helper is picked up by every project immediately. Add tests for helpers in `packages/utils/src`.
