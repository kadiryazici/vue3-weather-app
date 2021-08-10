<script lang="ts">
export default {
   name: 'Weather'
};
</script>

<script lang="ts" setup>
import Circle from 'virtual:vite-icons/mdi/circle-medium';
import ThermometerIcon from 'virtual:vite-icons/mdi/thermometer';
import Celcius from 'virtual:vite-icons/mdi/temperature-celsius';
import ChevronLeft from 'virtual:vite-icons/mdi-light/chevron-left';
import IconWater from 'virtual:vite-icons/mdi/water';
import IconWind from 'virtual:vite-icons/ph/wind-bold';
import IconClock from 'virtual:vite-icons/mdi/clock-time-eight-outline';

import { computed } from 'vue';
import { useWeatherStore } from '/src/stores/weatherStore';

const weatherStore = useWeatherStore();
const info = $computed(() => weatherStore.weather!);

function handleBack() {
   weatherStore.animTo = 'toSearch';
   weatherStore.weather = null;
}

const mainList = $computed(
   () =>
      [
         ['Temperature', info.main.temp, Celcius],
         ['Feels Like', info.main.feels_like, Celcius],
         ['Max', info.main.temp_max, Celcius],
         ['Min', info.main.temp_min, Celcius],
         ['Humidity', info.main.humidity, IconWater]
      ] as const
);

const windList = $computed(
   () =>
      [
         ['Speed', info.wind.speed, 'km/h'],
         ['Angle Degree', info.wind.deg, '°']
      ] as const
);

interface Hour {
   sky: 'day' | 'night';
   time: string;
}
const clock = $computed((): Hour => {
   const time = info.dt * 1000;
   const timeZone = info.timezone * 1000;
   const date = new Date(time + timeZone);

   const zeroify = (v: number) => ('0' + v).slice(-2);

   const currentHour = date.getUTCHours();

   const hours = zeroify(currentHour);
   const minutes = zeroify(date.getUTCMinutes());

   let sky = 'day' as Hour['sky'];
   if (currentHour >= 19 || currentHour <= 5) {
      console.log({
         currentHour
      });
      sky = 'night';
   }

   weatherStore.sky = sky;

   return {
      sky,
      time: `${hours}:${minutes}`
   };
});
</script>

<template>
   <section class="weather-container">
      <div class="title">
         <div class="section city-name">
            <ChevronLeft @click="handleBack" class="click icon" />
            <span class="mx-auto">{{ info.name }}</span>
            <ChevronLeft class="icon invisible" />
         </div>
      </div>

      <div class="section">
         <div class="icon-wrapper">
            <IconClock class="icon mr-2" />
            <span>{{ clock.time }}</span>
         </div>
      </div>

      <div class="section">
         <div class="icon-wrapper mb-2">
            <ThermometerIcon class="icon mr-2" /> Heat
         </div>

         <div
            v-for="[name, value, endingComponent] of mainList"
            class="info-section icon-wrapper"
         >
            <Circle class="icon" />
            <span class="key">{{ name }}:&nbsp;</span>
            <span class="value">{{ value }}</span>
            <component :is="endingComponent" class="value" />
         </div>
      </div>

      <div class="section">
         <div class="icon-wrapper mb-2">
            <IconWind class="icon mr-2" /> Wind
         </div>

         <div
            v-for="[name, value, endsWith] of windList"
            class="info-section icon-wrapper"
         >
            <Circle class="icon" />
            <span class="key">{{ name }}:&nbsp;</span>
            <span class="value">{{ value }}{{ endsWith }}</span>
         </div>
      </div>
   </section>
</template>

<style lang="scss" scoped>
.weather-container {
   @apply h-full p-5 text-white text-shadow-md text-size-22px block overflow-y-auto;

   .section {
      @apply bg-true-gray-700 w-full p-2 bg-opacity-20 rounded-md mb-2 shadow shadow-sm shadow-dark-900;
      .icon-wrapper {
         @apply flex flex-row items-center w-full text-size-20px;
      }
   }
   .title {
      @apply flex flex-nowrap;
      & > * {
         @apply relative;
      }
      .city-name {
         @apply text-white text-size-20px text-center flex flex-row items-center;
      }
   }

   .info-section {
      .key {
         @apply text-size-15px text-violet-400;
      }
      .value {
         @apply text-size-15px;
      }
   }
}

.icon {
   @apply text-size-25px;
   &.invisible {
      @apply opacity-0 select-none;
   }

   &.click {
      @apply cursor-pointer hover:bg-true-gray-900 hover:bg-opacity-10 rounded-full;
   }
}
</style>
