# Nav visual baseline — 2026-09-08 (pre rework, homepage `/`)

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
