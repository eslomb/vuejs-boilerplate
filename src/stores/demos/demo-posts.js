import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch } from '@/composables/useFetch.js';

export const usePostsStore = defineStore('demo-posts', () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/';

    const posts = ref([]);

    const api = useFetch();

    const getPosts = async () => {
        posts.value = [];
        await api.call(apiUrl + 'posts');
        posts.value = api.data.value;
    };

    const createPost = async () => {
        const newpost = { id: 1, title: 'foo', body: 'bar', userId: 1 };
        await api.call(apiUrl + 'posts', newpost, { method: 'POST' });
    };

    const reset = () => {
        posts.value = [];
    }

    return {
        getPosts,
        createPost,
        reset,
        api,
        posts,
    }
});