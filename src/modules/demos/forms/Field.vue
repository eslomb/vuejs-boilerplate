<script setup>

defineProps({
    properties: { type: Object, required: true },
});

</script>

<template>
    <div class="field-group" :id="properties.id" :style="{gridArea: properties.id}">
        <label v-if="properties.label">{{ properties.label }}</label>
        
        <slot></slot>
            
        <div v-if="properties.errorMessage" class="errorMessage">
        {{ properties.errorMessage }}
        </div>
    </div>
</template>

<style>
</style>