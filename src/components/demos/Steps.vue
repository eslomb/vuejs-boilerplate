<script setup>
import { useStepsStore } from "../../stores/steps";
import { computed } from "vue";

import ComponentA from '@/components/demos/ComponentA.vue';
import Products from "@/components/demos/Products.vue";
import Counter from '@/components/demos/Counter.vue';
import UsersList from '@/components/demos/UsersList.vue';
import PostsList from '@/components/demos/PostsList.vue';
import UsersTable from '@/components/demos/UsersTable.vue';
import PostsTable from '@/components/demos/PostsTable.vue';
import InfiniteScroll from '@/components/demos/InfiniteScroll.vue';

const stepsArr = [InfiniteScroll, Products, UsersTable, UsersList, PostsTable, PostsList, ComponentA, Counter ];

const steps = useStepsStore();
steps.load(stepsArr);

// Computed para obtener el componente actual
const currentComponent = computed(() => steps.currentStep);

</script>

<template>
    <h2>Steps</h2>
    
    <nav class="steps-buttons">
        <button :disabled="steps.isFirstStep" @click="steps.goToFirstStep()">First</button>
        <button :disabled="steps.isFirstStep" @click="steps.previous()">Previous</button>
        <button :disabled="steps.isLastStep" @click="steps.next()">Next</button>
        <button :disabled="steps.isLastStep" @click="steps.goToLastStep()">Last</button>
         - 
        <button v-for="step in stepsArr" :key="step.__name" 
            :disabled="currentComponent.__name == step.__name" 
            @click="steps.goToStep(step.__name)">
            {{ step.__name }}
        </button>
    </nav>
    
    <component :is="currentComponent"></component>

    <!-- TO DO: no funciona bien si pongo component en una transition
    <Suspense>
        <template #default>
            <Transition name="fade" mode="out-in">
            </Transition>
        </template>
        <template #fallback>
            <p>Loading...</p>
        </template>
    </Suspense>-->

</template>

<style>
    /* .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    } */


    .steps-buttons{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        button{
            padding: 8px 10px;
            border-radius: 6px;
            border: 0;
        }
    }   
    
    
    .fetch-buttons{
        display: flex;
        flex-wrap: wrap;
        gap: 1em;
        background-color: darkslateblue;
        padding: 1em;
        margin-block: 10px;

        button {
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            cursor: pointer;
            background-color: aliceblue;
        }
    }
</style>