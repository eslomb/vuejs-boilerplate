import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch.js';

export const useUsersStore = defineStore('demo-users', () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/';

    const users = ref([]);

    const api = useFetch();

    const getUsers = async () => {
        users.value = [];
        await api.call(apiUrl + 'users');
        users.value = api.data.value;
    };
    
    const getSlowEndpoint = async () => {
        users.value = [];
        await api.call(apiUrl + 'users', null, { timeout: 10000 }); // timeout
        users.value = api.data.value;
    };

    const reset = () => {
        users.value = [];
    }

    return {
        getUsers,
        getSlowEndpoint,
        reset,
        api,
        users
    }
});