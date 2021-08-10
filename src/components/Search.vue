<script lang="ts">
export default {
   name: 'Search'
};
</script>

<script lang="ts" setup>
import debounce from 'lodash.debounce';
import { nextTick, watch } from 'vue';
import RoomIcon from 'virtual:vite-icons/ic/round-room';

import { searchPlace } from '/src/api/searchPlace';
import { LocationSearch } from '/src/api/types';

import Input from '/src/components/Input.vue';
import { getWeather } from '/src/api/getWeather';
import { useWeatherStore } from '/src/stores/weatherStore';

const weatherStore = useWeatherStore();

let query = $ref('');
let result = $ref<null | LocationSearch>(null);
let loadingWetherResult = $ref(false);

const searchLocation = debounce(async (query: string) => {
   const res = await searchPlace(query);
   result = res;
   console.log(res);
}, 400);

watch($raw(query), (newValue) => {
   if (newValue.length <= 0) {
      result = null;
      return;
   }
   searchLocation(newValue);
});

async function handleResultClick(name: string) {
   if (loadingWetherResult) return;

   loadingWetherResult = true;
   const res = await getWeather(name);
   loadingWetherResult = false;
   weatherStore.animTo = 'toWeather';
   weatherStore.weather = res;
}
</script>

<template>
   <div id="search-container">
      <Input placeholder="Search City, State" v-model.trim="query" />

      <section v-if="result" class="result-section">
         <ol class="result-list">
            <TransitionGroup moveClass="result-list-move">
               <li
                  :key="hit.objectID"
                  class="result-list-item"
                  v-for="hit of result.hits"
                  @click="handleResultClick(hit.locale_names[0])"
               >
                  <span class="result-icon"><RoomIcon /></span>
                  <span class="name">{{ hit.locale_names[0] }}</span>
                  <span class="administrative">{{
                     `${hit.country} - ${hit.administrative[0]}`.toLowerCase()
                  }}</span>
               </li>
            </TransitionGroup>
         </ol>
      </section>
   </div>
</template>

<style lang="scss" scoped>
#search-container {
   @apply p-5 text-size-1.5rem text-white text-shadow-md text-center flex flex-col h-full;

   .title {
      @apply pb-3;
   }

   .result-section {
      @apply h-full flex-shrink overflow-auto mt-4;
      .result-list {
         @apply flex flex-row flex-wrap overflow-x-hidden;
         .result-list-item {
            @apply w-full 
               text-size-16px 
               text-left 
               p-2 
               cursor-pointer 
               bg-true-gray-700 
               bg-opacity-20 
               rounded-md
               mb-3px
               flex flex-row 
               hover:bg-true-gray-900
               hover:bg-opacity-50
               items-center;

            .result-icon {
               @apply inline-flex items-center pr-2;
            }

            .name,
            .result-icon {
               @apply text-violet-300;
            }
            .administrative {
               @apply text-light-700 text-size-12px ml-2;
            }
         }
      }
   }
}
.result-list-move {
   transition: transform 0.3s ease;
}
</style>
