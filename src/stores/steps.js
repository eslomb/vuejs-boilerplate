import { defineStore } from "pinia";
import { ref, computed, markRaw } from "vue";


export const useStepsStore = defineStore('stepsStore', () => {
    
    const steps = ref(null);
    const currentStep = ref(null);

    const isFirstStep = computed(() => steps.value && steps.value[0] === currentStep.value);
    const isLastStep = computed(() => steps.value && steps.value[steps.value.length - 1] === currentStep.value);

    function updateCurrentStep(step) {
        currentStep.value = markRaw(step);
    }

    function load(stepsArr) {
        steps.value = stepsArr;
        goToFirstStep();
    }

    function next() {
        const idx = steps.value.findIndex(r => r === currentStep.value);
        if (idx < steps.value.length - 1) {
            updateCurrentStep(steps.value[idx + 1]);
        }
    }

    function previous() {
        const idx = steps.value.findIndex(r => r === currentStep.value);
        if (idx > 0) {
            updateCurrentStep(steps.value[idx - 1]);
        }
    }

    function goToFirstStep() {
        updateCurrentStep(steps.value[0]);
    }

    function goToLastStep() {
        updateCurrentStep(steps.value[steps.value.length - 1]);
    }

    function goToStep(componentName) {
        const step = steps.value.find(r => {
            const secureComponentName = r.name || r.__name;
            return secureComponentName.toLowerCase() === componentName.toLowerCase()
        });
        if (!step) {
            const available = steps.value.map(r => r.name).join(', ');
            console.log(steps.value, `Step "${componentName}" not found. Available: ${available}`);
            // throw new Error('Step not found');
        }
        updateCurrentStep(step);
    }

    return {
        load,
        steps,
        currentStep,
        isFirstStep,
        isLastStep,
        next,
        previous,
        goToFirstStep,
        goToLastStep,
        goToStep
    };
});