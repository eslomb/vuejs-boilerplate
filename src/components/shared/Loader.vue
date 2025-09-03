<script setup>
// npm install vue-spinner
// https://github.com/greyby/vue-spinner
import BeatLoader from 'vue-spinner/src/BeatLoader.vue';

const props = defineProps({
    loader: { default: BeatLoader },
    loading: { type: Boolean, default: false },
    color: { type: String, default: 'black' },
    size: { type: String, default: '15px' },
    margin: { type: String, default: '2px' },
    radius: { type: String, default: '100%' }
})
</script>

<template>
    <component :is="loader" :loading="loading" :color="color" :size="size" :margin="margin" :radius="radius"></component>
</template>

