<script setup>
import { useCounterStore } from "../../stores/demos/demo-counter";
const counter = useCounterStore();

</script>

<template>

    <h3>Counter</h3>
    <div>Count: {{ counter.count }}</div>
    <SharedLinkButton @click="() => counter.increment()">Incrementar</SharedLinkButton>

</template>
