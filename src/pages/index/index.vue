<script lang="ts" setup>
import Weather from '/src/components/Weather.vue';
import Search from '/src/components/Search.vue';
import { useWeatherStore } from '/src/stores/weatherStore';

const weatherStore = useWeatherStore();
</script>

<template>
   <div id="container">
      <Transition
         :enterActiveClass="
            weatherStore.animTo === 'toWeather'
               ? 'slide-in-right'
               : 'slide-in-left'
         "
         :leaveActiveClass="
            weatherStore.animTo === 'toWeather'
               ? 'slide-out-left'
               : 'slide-out-right'
         "
      >
         <KeepAlive exclude="Weather">
            <Search :key="25" v-if="!weatherStore.weather" />
            <Weather
               :key="weatherStore.weather.id"
               v-else-if="weatherStore.weather"
            />
         </KeepAlive>
      </Transition>
   </div>
</template>

<style lang="scss" scoped>
#container {
   @apply z-3 w-full
      max-w-500px
      max-h-[auto]
      h-500px
      m-auto
      rounded-xl
      bg-dark-900
      bg-opacity-50
      backdrop-blur-md
      backdrop-saturate-250
      backdrop-filter
      shadow-dark-900
      shadow
      relative
      overflow-hidden;

   .title {
      @apply text-white text-shadow-md text-size-25px flex flex-nowrap;
      .icon-container {
         @apply transform w-full flex-shrink-0 flex flex-nowrap duration-350ms transition-transform;

         & > * {
            @apply flex-shrink-0 w-full px-4 pt-10;
         }

         &.day {
            @apply translate-x-[0%];
         }
         &.night {
            @apply translate-x-[-100%];
         }
      }
   }
}

.slide-in-right {
   animation: slideInRight 0.35s;
   @apply absolute left-0 top-0 w-full h-full;
}
.slide-out-left {
   animation: slideOutLeft 0.35s;
   @apply absolute left-0 top-0 w-full h-full;
}

.slide-in-left {
   animation: slideOutLeft reverse 0.35s;
   @apply absolute left-0 top-0 w-full h-full;
}
.slide-out-right {
   animation: slideInRight 0.35s reverse;
   @apply absolute left-0 top-0 w-full h-full;
}

@keyframes slideInRight {
   0% {
      transform: translateX(100%);
   }
   100% {
      transform: translateX((0%));
   }
}
@keyframes slideOutLeft {
   0% {
      transform: translateX(0%);
   }
   100% {
      transform: translateX(-100%);
   }
}
</style>
