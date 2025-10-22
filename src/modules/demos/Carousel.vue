<script setup>
import {  onMounted } from 'vue';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    options: {
        type: Object,
        default: {}
    },
    enablePagination: {
        type: Boolean,
        default: true
    },
    enableNavigation: {
        type: Boolean,
        default: true
    }
});

onMounted(() => {
});
</script>

<template>
    <div v-if="items && items.length>0">
        <Carousel v-bind="options" >
            <Slide v-for="item in items" :key="item" >
                <slot :item="item"></slot>
            </Slide>
            <template #addons>
                <Navigation v-if="enableNavigation" />
                <Pagination v-if="enablePagination" />
            </template>
        </Carousel>
    </div>

</template>

<style scoped>
/* 
.carousel{
    img{
        width: 100%;
        height: auto;
        object-fit: cover;
    }
}
.carousel__slide{
    background-color: rgb(236, 236, 236);
} */
</style>
