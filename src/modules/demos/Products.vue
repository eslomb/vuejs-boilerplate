<script setup>
import { computed, onMounted } from 'vue';
import Carousel from './Carousel.vue';
import { useProductsStore } from '../../stores/demos/demo-products';

const productsStore = useProductsStore();

const products = computed(() => productsStore.products?.slice(0 , 5));

const carouselOptions = {
    gap: 40,
    wrapAround: true,
    breakpointMode:"carousel",
    breakpoints:{
      700: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      1000: {
        itemsToShow: 'auto',
        snapAlign: 'start',
      }
    }
}

onMounted(() => {
    if (productsStore.products.length === 0)
        productsStore.getProducts();
})
</script>

<template>
    <div class="products-slider">
        <Carousel :items="products" :options="carouselOptions" :enable-pagination="false">
            <template v-slot="{ item }">
                <div class="slide-content" >
                    <img :src="item.image" alt="">
                    <h3>{{ item.title }}</h3>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<style  lang="scss">
.products-slider{
    width: 100%;
    max-width: 1200px;
    margin:50px  auto;
    button{
        background: rgba(255, 255, 255, 1);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        &.carousel__prev{
            margin-left: -25px;
        }
        &.carousel__next{
            margin-right: -25px;
        }
    }
}
.slide-content{
    display: grid;
    grid-template-areas: "stack";
    align-items: center;
    justify-content: center;

    img{
        max-width: 100%;
        height: auto;
        object-fit: cover;
        display: block;
    }

    & > *{
        grid-area: stack;
        grid-row: 1 / 2;
        grid-column: 1 / 2;
        margin: auto;
    }
    & > h3 {
        color: white;
        padding: 10px;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: 1.5rem;
        font-weight: bold;
        max-width: 400px;
        line-height: 1.3;
        text-align:  center;
    }
}
</style>