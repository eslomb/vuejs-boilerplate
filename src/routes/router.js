import { createRouter, createWebHistory } from 'vue-router'
import Steps  from '@/views/StepsView.vue';
import ComponentA  from '@/modules/demos/ComponentA.vue';
import Counter  from '@/modules/demos/Counter.vue';
import ContactForm from '@/modules/demos/forms/ContactForm.vue';

const routes = [
    { path: '/', name: 'Home', component: Steps },
    { path: '/componentA', name: 'ComponentA', component: ComponentA },
    { path: '/counter', name: 'Counter', component: Counter },
    { path: '/contact', name: 'Contacto', component: ContactForm },
]

export const router = createRouter({
    history: createWebHistory(window.location.pathname),
    routes
})