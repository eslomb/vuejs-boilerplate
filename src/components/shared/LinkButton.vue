<script setup>
// import BeatLoader from 'vue-spinner/src/BeatLoader.vue';

const props = defineProps({
    href: { type: String, default: '#' },
    customClass: { type: [String, Object], default: '' },
    loading: { type: Boolean, default: false }
});

const emits = defineEmits(['click']);

const handleClick = (e) => emits('click', e);

</script>

<template>
  <a
    :href="href"
    class="link-button"
    :class="{disabled: loading, ...customClass}"
    @click="handleClick"
    v-bind="$attrs"
  >
    <!-- <BeatLoader color="white" :loading="loading" size="8px" ></BeatLoader> -->
    <slot v-if="!loading" />
  </a>
</template>

<style scoped>
.link-button{
    display: inline-block;
    background-color: hsl(0, 74%, 40%);
    color: white;
    padding: 8px 10px;
    border-radius: 6px;
    text-decoration: none;
    text-align: center;
    font-size: 1rem;
    transition: .2s;
    &:hover{
        background-color: hsl(0, 74%, 60%);
        color: white;
    }
    &.disabled{
      pointer-events: none;
      background-color: hsl(0, 1%, 49%);
    }
}
</style>