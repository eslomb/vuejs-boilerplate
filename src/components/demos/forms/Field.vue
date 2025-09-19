<script setup>
import { ref, computed, onMounted } from "vue";

defineProps({
    properties: { type: Object, required: true },
    component: { type: Object, required: true },
});

onMounted(() => {});
</script>

<template>
    <div class="field-group" :id="properties.id" :style="{gridArea: properties.id}">
        <label v-if="properties.label">{{ properties.label }}</label>
        
        <component v-if="component"
            :is="component.type"
            :value="component.value"
            v-bind="component.attributes"
            v-on="component.events"      
            />
        <div v-if="properties.errorMessage" class="errorMessage">
        {{ properties.errorMessage }}
        </div>
    </div>
</template>

<style>
</style>