<script setup>
import { ref, computed, onMounted } from "vue";
import { useInfiniteScroll } from '@vueuse/core'
import {useFetch} from '@/composables/useFetch.js';
import Loader from '@/components/shared/Loader.vue';

const apiUrl = "https://dummyjson.com/";
const itemsToRender =  10;

const api = useFetch();
const fetching = ref(false);
const itemsList = ref([]);

async function fetchItems(limit, skip){
    await api.call(`${apiUrl}users?limit=${limit}&skip=${skip}`);
    return api.data.value;  
}
async function getUsers(){
    fetching.value = true;
    // await new Promise(resolve => setTimeout(resolve, 1500));
    const newUsers = await fetchItems(itemsToRender, itemsList.value.length);   
    fetching.value = false;
    itemsList.value.push(...newUsers.users);
}

onMounted(() => {
    useInfiniteScroll(document, async()=>{await getUsers();}, { distance: 20 });
});
</script>

<template>
    <div>
        <ul ref="listEL">
            <li v-for="item in itemsList" :key="item.id">
                <h3>{{ item.firstName }} {{ item.lastName }}</h3>
                <p>
                    Email: {{ item.email }}
                    <span class="phone">Phone: {{ item.phone }}</span>
                </p>
            </li>
            <li><Loader :loading="fetching" color="black" size="12px" /></li>
        </ul>
    </div>
</template>

<style scoped>
    ul{
        background-color: ghostwhite;
        list-style: none;
        list-style-type: none ;
        max-width: 600px;
        overflow-y: auto;
        padding-inline: min(3rem, 8%);
        padding-block: 20px;
        &>li{
            padding: 5px 0 ;
            color: darkslateblue;
            font-size: 1rem;
            h3{
                margin: 0;
                padding: 0;
                font-size: 1.2rem;
            }   
            p{
                line-height: 1.2;
                margin: 0;
            }
            .phone{
                display: block;
                font-size: .9rem;
                color: gray
            }
        }
    }
</style>