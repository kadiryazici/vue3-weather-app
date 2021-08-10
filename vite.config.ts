import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Windi from 'vite-plugin-windicss';
import Icons from 'vite-plugin-icons';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      vue({
         script: {
            refSugar: true
         }
      }),
      Pages({
         pagesDir: 'src/pages'
      }),
      Windi(),
      Icons()
   ]
});
