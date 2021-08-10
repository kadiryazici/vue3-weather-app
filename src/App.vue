<script setup lang="ts">
import { useWeatherStore } from '/src/stores/weatherStore';

const weather = useWeatherStore();
</script>

<template>
   <div :class="{ active: weather.sky === 'day' }" class="day-bg"></div>
   <div :class="{ active: weather.sky === 'night' }" class="night-bg"></div>

   <RouterView v-slot="{ Component }">
      <Suspense>
         <component :key="$route.fullPath" :is="Component" />
      </Suspense>
   </RouterView>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

* {
   box-sizing: border-box;
   -webkit-tap-highlight-color: transparent;
}

#app {
   @apply min-h-100vh min-w-100vw flex p-2 relative;
   font-family: 'Lexend Deca', sans-serif;
}

.night-bg,
.day-bg,
.container-bg {
   @apply absolute left-0 top-0 w-full h-full -z-1 duration-350 transition-opacity opacity-0;
   &.active {
      @apply opacity-100;
   }
}
.night-bg {
   background-image: url(https://static.vecteezy.com/system/resources/previews/002/042/415/non_2x/flat-illustration-of-mountain-night-scene-vector.jpg);
   background-size: cover;
}
.day-bg {
   background: url(https://i.pinimg.com/originals/3e/16/03/3e1603bbeb8db6a4581096e8b0bb2782.jpg);
   background-size: cover;
}
.container-bg {
   background-image: url(https://p4.wallpaperbetter.com/wallpaper/132/401/75/painting-clouds-sky-landscape-wallpaper-preview.jpg);
   background-size: cover;
}
* {
   ::-webkit-scrollbar {
      width: 3px;
   }
   ::-webkit-scrollbar-thumb {
      width: 3px;
      @apply bg-cool-gray-50;
   }
}
</style>
