<!-- eslint-disable vue/attribute-hyphenation -->
<!-- the add to calendar button does't work with kebab-case attributes -->
<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import 'add-to-calendar-button';

const defaultMaxCalEvents = 5;
const maxCalEvents = ref(defaultMaxCalEvents);

// Fix calendar button width in shadow DOM, since the library doesn't support it out of the box and we want it to be full width
const calendarButton = ref<HTMLElement | null>(null);
onMounted(async () => {
  if (import.meta.client) {
    await customElements.whenDefined('add-to-calendar-button');
    await nextTick();

    const shadowRoot = calendarButton.value?.shadowRoot;
    if (shadowRoot && !shadowRoot.getElementById('activity-calendar-button-width-style')) {
      const style = document.createElement('style');
      style.id = 'activity-calendar-button-width-style';
      style.textContent = `
        :host {
          display: block;
          width: 100%;
        }

        .atcb-initialized {
          display: block;
          position: relative;
          width: 100% !important;
        }

        .atcb-button-wrapper {
          display: block;
          width: 100%;
        }

        .atcb-button {
          width: -moz-available;
          width: -webkit-fill-available;
          width: stretch;
          max-width: none;
          box-sizing: border-box;
        }
      `;
      shadowRoot.prepend(style);
    }
  }
});

/**
 * There's a bunch more data, but we don't need it
 * Documentation can be found at https://developers.google.com/calendar/api/v3/reference/events/list
 */
type Event<DateTimeFormat extends Date | string> = {
  id: string;
  status: 'confirmed' | string;
  summary: string;
  location: string;
  start: DateTimeFormat extends Date
    ? Date
    :
        | {
            dateTime: string;
          }
        | {
            date: string;
          };
  end: DateTimeFormat extends Date
    ? Date
    :
        | {
            dateTime: string;
          }
        | {
            date: string;
          };
  multiday_end?: DateTimeFormat extends Date
    ? Date
    :
        | {
            dateTime: string;
          }
        | {
            date: string;
          };
  multimonth_end?: boolean;
};

const { data: calendarData } = await useAsyncData<{ items: Event<string>[] }>('activity-calendar', async () => {
  try {
    return await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/c_cb2b2ab9761bec69a9d24fd452f2d970d31755cf1c382272560d81fddca0e5e5@group.calendar.google.com/events?key=AIzaSyBo4AYTvUouRsZbG4KiopyeIng_1UOdNyc&orderBy=startTime&singleEvents=true&timeMin=' +
        new Date().toISOString(),
    ).then((res) => res.json());
  } catch (err) {
    console.error(err);
    return { items: [] };
  }
});

const events = computed<Event<Date>[]>(() => {
  const items = Array.isArray(calendarData.value?.items) ? calendarData.value.items : [];

  return items
    .filter((event) => event.status === 'confirmed')
    .map((event) => {
      let tempEvent: Event<string | Date> = event;
      if ('date' in event.start) {
        tempEvent = {
          ...tempEvent,
          start: new Date(event.start.date),
        };
      } else {
        tempEvent = {
          ...tempEvent,
          start: new Date(event.start.dateTime),
        };
      }
      if ('date' in event.end) {
        tempEvent = {
          ...tempEvent,
          end: new Date(event.end.date),
        };
      } else {
        tempEvent = {
          ...tempEvent,
          end: new Date(event.end.dateTime),
        };
      }
      return tempEvent;
    });
});

const visibleEvents = computed<Event<Date>[]>(() => {
  const enhancedEvents: Event<Date>[] = [];
  for (const item of events.value) {
    const endMinusFourHours = new Date(item.end.getTime() - 14400000); // is still same day 4 h back
    const isShortEvent = item.end.getTime() - item.start.getTime() < 21600000; // shorter than 6 H
    const isNotExactlyFullDay = item.end.getTime() - item.start.getTime() !== 86400000; // Not exactly full day
    const needsMultidayEnd =
      endMinusFourHours.toLocaleDateString('nl', { day: 'numeric' }) !==
        item.end.toLocaleDateString('nl', { day: 'numeric' }) &&
      isNotExactlyFullDay &&
      isShortEvent;

    if (needsMultidayEnd) {
      const hasDifferentMonth =
        item.start.toLocaleDateString('nl', { month: 'short' }) !==
        endMinusFourHours.toLocaleDateString('nl', { month: 'short' });

      enhancedEvents.push({
        ...item,
        multiday_end: endMinusFourHours,
        multimonth_end: hasDifferentMonth,
      });
    } else {
      enhancedEvents.push({ ...item });
    }
  }

  return Array.from(enhancedEvents.values()).slice(0, maxCalEvents.value);
});

function getLocationLink(location: string): string {
  const locationMappings: { [key: string]: string } = {
    hideout: 'https://goo.gl/maps/jgiRSbRDpSzCqoiWA',
    hl15: 'https://goo.gl/maps/fjbPzpTAYB6CMwSv5',
    pl101: 'https://goo.gl/maps/UtboneV2dUFEmGeRA',
    pl99: 'https://goo.gl/maps/q4CDYQcyiBYCwGkC7',
    ucs: 'https://goo.gl/maps/MeUEBY4ahNgi6WmW8',
  };

  const lowercaseLocation = location.toLowerCase().replaceAll(' ', '');
  if (lowercaseLocation in locationMappings) {
    return locationMappings[lowercaseLocation] ?? '';
  } else if (lowercaseLocation.startsWith('hl15')) {
    return 'https://goo.gl/maps/fjbPzpTAYB6CMwSv5';
  } else {
    return `https://maps.google.com/?q=${encodeURIComponent(location)}`;
  }
}

const isExpanded = ref(false);

function toggleEvents(): void {
  isExpanded.value = !isExpanded.value;
  maxCalEvents.value = isExpanded.value ? events.value.length : defaultMaxCalEvents;
}

const hiddenCount = computed(() => Math.max(0, events.value.length - maxCalEvents.value));

function extractHourAndMinutes(timeString: string) {
  const regex = /(\d{2}:\d{2}):\d{2}/;
  const match = timeString.match(regex);
  return match ? match[1] : null;
}
</script>

<template>
  <h2 class="title">Agenda</h2>
  <ClientOnly>
    <div class="events-container">
      <article v-if="!visibleEvents.length">
        <p>Voorlopig zijn er geen activiteiten.</p>
        <p>Voeg de kalender toe aan je agenda om up-to-date te blijven!</p>
      </article>
      <div v-for="event in visibleEvents" :key="event.id" class="event">
        <div class="date">
          <span class="day">{{ event.start.toLocaleDateString('nl', { day: 'numeric' }) }}</span>
          <div v-if="event.multiday_end && !event.multimonth_end">
            <span class="t-m">t/m<br /></span>
            <span class="day">{{ event.multiday_end.toLocaleDateString('nl', { day: 'numeric' }) }}<br /></span>
          </div>

          <br v-else />
          <span class="month">{{ event.start.toLocaleDateString('nl', { month: 'short' }) }}</span>
          <div v-if="event.multiday_end && event.multimonth_end">
            <span class="t-m">t/m<br /></span>
            <span class="day">{{ event.multiday_end.toLocaleDateString('nl', { day: 'numeric' }) }}</span>
            <br />
            <span class="month">{{ event.multiday_end.toLocaleDateString('nl', { month: 'short' }) }}</span>
          </div>
        </div>
        <div class="details">
          <p class="title" style="font-weight: bold; margin-block-end: 0.2em">{{ event.summary }}</p>
          <p
            v-if="
              !(
                (extractHourAndMinutes('' + event.start) == '01:00' &&
                  extractHourAndMinutes('' + event.end) == '01:00') ||
                (extractHourAndMinutes('' + event.start) == '02:00' && extractHourAndMinutes('' + event.end) == '02:00')
              )
            "
          >
            {{ extractHourAndMinutes('' + event.start) }} => {{ extractHourAndMinutes('' + event.end) }}
          </p>
          <a v-if="event.location" class="location" :href="getLocationLink(event.location)" target="_blank">
            @{{ event.location }}
          </a>
        </div>
      </div>
      <button
        v-if="events.length > defaultMaxCalEvents"
        class="button primary rounded indi-green-1"
        @click="toggleEvents"
      >
        {{ isExpanded ? `laat minder zien` : `laat ${hiddenCount} meer zien` }}
      </button>
    </div>
    <div class="button-container">
      <add-to-calendar-button
        ref="calendarButton"
        name="Indicium"
        :startDate="new Date(Date.now() - 86400000).toISOString().split('T')[0]"
        startTime="00:00"
        endTime="00:00"
        timeZone="Europe/Amsterdam"
        icsFile="https://calendar.google.com/calendar/ical/c_cb2b2ab9761bec69a9d24fd452f2d970d31755cf1c382272560d81fddca0e5e5%40group.calendar.google.com/public/basic.ics"
        subscribe
        iCalFileName="Indicium Activiteiten Kalender"
        options="'Apple','Google','iCal','Outlook.com','Microsoft365','MicrosoftTeams'"
        listStyle="modal"
        label="Importeer agenda"
        :lightMode="$colorMode.value == 'dark' ? 'dark' : 'light'"
        language="nl"
        style="width: 100%; margin-block-end: 0.5em; --btn-shadow: unset; --btn-shadow-hover: unset"
        hideBranding
      ></add-to-calendar-button>
    </div>
    <template #fallback>
      <div class="events-container events-container--fallback" aria-hidden="true">
        <div v-for="index in defaultMaxCalEvents" :key="index" class="event event--placeholder">
          <div class="date"></div>
          <div class="details">
            <p class="placeholder-line"></p>
            <p class="placeholder-line short"></p>
          </div>
        </div>
        <span v-if="events.length > defaultMaxCalEvents" class="button button--placeholder">Laden...</span>
      </div>
      <div class="button-container" aria-hidden="true">
        <span class="button button--placeholder-2 button--placeholder-2--loading">Importeer agenda in je kalender</span>
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
.event {
  display: grid;
  grid-template-columns: 63px 1fr;
  text-align: left;
  line-height: 1.7;

  .date {
    display: block;
    text-align: center;
    padding: 4px;
    background-color: var(--indi-green-2);
    border-radius: 5px;
    align-self: baseline;

    .day {
      font-size: 32px;
      line-height: 32px;
    }
    .month {
      font-size: 19px;
    }

    .button {
      align-self: center;
    }
  }

  .details {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 0;

    & p {
      margin: 0;
    }

    .location {
      font-style: italic;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.events-container {
  background-color: var(--secondary-background-color);
  border-radius: 4px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 18rem;
}

.events-container--fallback {
  .event--placeholder {
    min-height: 99.2px;

    .date {
      min-height: 75.5px;
    }

    .details {
      justify-content: center;

      .placeholder-line {
        margin: 0;
        height: 0.9rem;
        background-color: color-mix(in srgb, var(--text-color) 18%, transparent);
        border-radius: 6px;
        width: 85%;

        &.short {
          width: 55%;
          margin-top: 0.4rem;
        }
      }
    }
  }
}

.button-container {
  display: grid;
  place-items: center;
  text-align: center;
  padding-top: 1em;
}

.button--placeholder {
  opacity: 0.8;
  pointer-events: none;
  background-color: color-mix(in srgb, var(--indi-green-1) 35%, transparent);
  border-radius: 0.5rem;
}

.button--placeholder-2 {
  display: block;
  width: 100%;
  max-width: 100%;
  padding: 0.9rem 1.25rem;
  border-radius: 0.5rem;
  color: color-mix(in srgb, var(--text-color) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--indi-green-1) 35%, transparent);
  opacity: 0.8;
  line-height: 1.5;
  pointer-events: none;
}

.button--placeholder-2--loading {
  min-height: 3.25rem;
}

.title {
  margin: 1rem 0;
}
</style>
