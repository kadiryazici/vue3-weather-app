import { defineStore } from 'pinia';
import { Weather } from '../api/types';

type SkyType = 'day' | 'night';

export const useWeatherStore = defineStore({
   id: 'weatherStore',
   state: () => ({
      sky: 'day' as SkyType,
      weather: null as Weather | null,
      animTo: 'toWeather' as 'toSearch' | 'toWeather'
   })
});
