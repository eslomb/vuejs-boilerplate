import './assets/scss/styles.scss';



import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// Registrar componentes automáticamente
import Autoregister from './plugins/autoregister.js';
app.use(Autoregister);

// Pinia
import { createPinia } from 'pinia';
app.use(createPinia());

// VueRouter
import {router} from './router';
app.use(router);

// PrimeVue
import PrimeVue from 'primevue/config';
import {appPreset} from './config/primevue.js';
app.use(PrimeVue, {
    theme: {
        preset: appPreset
    }
});

app.mount('#app');
