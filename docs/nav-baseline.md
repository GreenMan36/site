# Nav visual baseline — 2026-09-08 (pre rework, homepage `/`)

> **Status 2026-09-13:** the E3 rewrite was reverted for mobile (regressions), so the mobile
> description below is current again — `NavMobile` renders its own slide-in panels, `MenuItem` is
> desktop-only, and the hydrate/visibility breakpoint is 944px (`layouts/default.vue`). Two
> desktop details changed since: the dropdown arrows are no longer `v-html` spans but CSS
> `::after` glyphs on `.menu-item`, and legend/ARIA state is as noted in the a11y section.
> Duplication is intentional for now (TD-010).

Tooling note: browser screenshots surface inline only, they can't be written
to disk from the harness — so this file records observations instead of PNGs.

## Desktop 1440px (`NavDesktop` + `MenuItem`)

- Closed: logo left; `Over ons ▾  Partners ▾  Contact ▾  [Quick Links]  [Lid worden]`.
- Open (hover `Over ons`): dropdown `Over Indicium / Huidig bestuur /
  Besturen Tijdlijn / Commissies / Dispuut`, dark panel with blue-green
  (`--indi-blue-green-1`) inset border = depth-0 color. Links centered.
- Hover fill turns link white on brand color; arrow glyphs are inline
  `&#x25BC/&#x25B6` v-html spans.

## Mobile 390px (`NavMobile`, slide-in panels)

- Closed: logo + hamburger (3 lines) top bar, blue inset underline.
- Open L1: full-height dark panel, rows `Over ons ▸ / Partners ▸ /
  Contact ▸ / Quick Links / Lid worden`, hamburger rotated to ×-ish state.
- Open L2 (tap `Over ons ▸`): blue-green panel slides over, back button `..`,
  rows `Over Indicium / Huidig bestuur / Besturen Tijdlijn / Commissies /
  Dispuut`.
- Colors cycle per level (blue → blue-green → green) — keep this language in
  the rework.

## A11y issues visible

- Hamburger is a `<div>` — no button role, no label, no `aria-expanded`.
- Submenu toggles (`▸`) are buttons with `title` only ("Goto submenu").
- Desktop submenus hover-only (TD-041); mobile requires JS state machine.

**Re-checked 2026-09-13:** the first two are still true (the revert brought the pre-E3
`NavMobile` markup back — `NavMobile.vue:79-118`), and neither nav announces expanded state:
`MenuItem`/`NavDesktop` open dropdowns via `:focus-within` but carry no
`aria-expanded`/`aria-haspopup`. So TD-041 is only half delivered (keyboard reachability); the
announcement and mobile-label halves are reopened.
