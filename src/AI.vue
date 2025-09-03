<script setup>
import { ref, computed, onMounted } from "vue";
import { GoogleGenAI, Modality } from "@google/genai";
import * as fs from "node:fs";
import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;

const apiKey = "AIzaSyCklkn6kPox6TuWivLegAyknwc7tsjUx6w";
const log = ref();
const loading = ref(false);

async function genImage() {
    loading.value = true;
    const ai = new GoogleGenAI({apiKey: apiKey});

    const prompt =
        "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme";

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image-preview",
        contents: prompt,
    });
    for (const part of response.candidates[0].content.parts) {
        if (part.text) {
            log.value = (part.text) + '---';
            
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");            
            fs.writeFileSync("gemini-native-image.png", buffer);
            log.value = ("Image saved as gemini-native-image.png");
        }
    }
    loading.value = false;
}

async function genText() {
    loading.value = true;
    const ai = new GoogleGenAI({apiKey: apiKey});
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Explain how AI works in a few words",
    });
    log.value = (response.text);
    loading.value = false;
}


onMounted(() => {

});
</script>
<template>
    <p>
        <button :disabled="loading" @click="genImage">Generate image</button>
        <button :disabled="loading" @click="genText">Generate text</button>
    </p>
    <UILoader :loading="loading" color="black" size="18px" />
    <div>
        {{log}}
    </div>
</template>
<style>
</style>