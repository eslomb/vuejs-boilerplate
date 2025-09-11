import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch.js';

export const useProductsStore = defineStore('demo-products', () => {
    const apiUrl = 'https://fakestoreapi.com/';

    const products = ref([]);

    const api = useFetch();

    const getProducts = async () => {
        products.value = [];
        await api.call(apiUrl + 'products');
        products.value = api.data.value;
    };

    const reset = () => {
        products.value = [];
    }

    return {
        getProducts,
        reset,
        api,
        products,
    }
});