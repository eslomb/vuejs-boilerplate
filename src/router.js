import { createRouter, createWebHistory } from 'vue-router'
import Steps  from '@/components/demos/Steps.vue';
import ComponentA  from '@/components/demos/ComponentA.vue';
import Counter  from '@/components/demos/Counter.vue';
import ContactForm from '@/components/demos/forms/ContactForm.vue';

const routes = [
    { path: '/', name: 'Home', component: Steps },
    { path: '/componentA', name: 'ComponentA', component: ComponentA },
    { path: '/counter', name: 'Counter', component: Counter },
    { path: '/contact', name: 'Contacto', component: ContactForm },
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})