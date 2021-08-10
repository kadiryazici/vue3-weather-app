import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from 'virtual:generated-pages';
import 'virtual:windi.css';
import { createPinia } from 'pinia';

const pinia = createPinia();
const router = createRouter({ history: createWebHistory(), routes });

const app = createApp(App);
app.use(pinia) //
   .use(router)
   .mount('#app');
