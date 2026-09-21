# Collection: `locations`

- **Source:** `content/agenda-locations.yml` · **Type:** `data` · **Schema:** yes
- **Used by:** `components/ActivityCalendar.vue` (short labels + Google Maps links for agenda event locations)

## Fields

`locations[]`: `{ match, short, query? }` — `match` keys the calendar event
location string, `short` is the displayed label, `query` overrides the Maps
search string (defaults to `short ?? location`).

## Query

```ts
const { data } = await useAsyncData('agenda-locations', () => queryCollection('locations').first());
const entries = data.value?.locations; // TOP level — never `.meta?.locations`
```

## Notes

- Single source of truth: no TS fallback — a missing/empty collection throws
  (`ActivityCalendar.vue`) instead of rendering degraded links.
- Tests mock this collection (`test/nuxt/ActivityCalendar.test.ts`,
  `test/unit/agenda.test.ts`).
