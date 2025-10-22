<script setup>
import { useStepsStore } from "@/stores/steps";
import { computed } from "vue";

import ComponentA from '@/modules/demos/ComponentA.vue';
import Products from "@/modules/demos/Products.vue";
import Counter from '@/modules/demos/Counter.vue';
import UsersList from '@/modules/demos/UsersList.vue';
import PostsList from '@/modules/demos/PostsList.vue';
import UsersTable from '@/modules/demos/UsersTable.vue';
import PostsTable from '@/modules/demos/PostsTable.vue';
import InfiniteScroll from '@/modules/demos/InfiniteScroll.vue';

const stepsArr = [InfiniteScroll, Products, UsersTable, UsersList, PostsTable, PostsList, ComponentA, Counter ];

const steps = useStepsStore();
steps.load(stepsArr);

// Computed para obtener el componente actual
const currentComponent = computed(() => steps.currentStep);

</script>

<template>
    <h2>Steps View Demo</h2>
    
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

<style scoped>
    /* .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    } */
    @property --luminosity {
        syntax: '<percentage>';
        initial-value: 80%;
        inherits: false;
    }
    @property --hue{
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: true;
    }
    @property --chroma{
        syntax: '<integer>';
        initial-value: 0;
        inherits: true;
    }

    .steps-buttons{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 2em;
        button{
            background-color: lch(var(--luminosity) var(--chroma) var(--hue));
            padding: 8px 10px;
            border-radius: 6px;
            border: 0;
            cursor: pointer;
            transition: all 0.2s;
            &:hover{
                --luminosity: 90%;
                --hue: 60deg;
                --chroma: 60;
            }
            &[disabled]{
                --luminosity: 95%; 
                cursor: not-allowed;
            }   
        }
    }   
    
    
    /* .fetch-buttons{
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
    } */
</style>