<script setup>
import { ref, shallowRef, computed, onMounted, markRaw } from "vue";
import { z } from 'zod';
import Field from "./Field.vue";
import Loader from "@/components/shared/Loader.vue";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Checkbox from "primevue/checkbox";
import { Select } from "primevue";

const sending = ref(false);
const sendResult = ref('');

const fields = ref([
    {
        properties: {
            id: "name",
            label: "Nombre",
            errorMessage: null,
        },
        component:{
            type: markRaw(InputText),
            value: '',
            attributes: {
                type: 'text',
                placeholder: 'Nombre y Apellido',
            },
        }
    },
    {
        properties: {
            id: "email",
            label: "E-mail",
            errorMessage: null,
        },
        component:{
            type: markRaw(InputText),
            value: '',
            attributes: {
                type: 'email',
                placeholder: 'Dirección de correo electrónico',
            },
        }
    },
    {
        properties: {
            id: "message",
            label: "Mensaje",
            errorMessage: null,
        },
        component:{
            type: markRaw(Textarea),
            value: '',
            attributes: {
                placeholder: 'Ingresa tu mensaje',
            },
        }
    },
    {
        properties: {
            id: "newsletter",
            label: "Suscribirme al newsletter",
            errorMessage: null,
        },
        component:{
            type: markRaw(Checkbox),
            value: true,
            attributes: {
                binary: true
            },
        }
    },
    {
        properties: {
            id: "conocido",
            label: "¿Cómo nos conociste?",
            errorMessage: null,
        },
        component:{
            type: markRaw(Select),
            value: null,
            attributes: {
                placeholder: 'Seleccionar...',
                options: [
                    {label: 'Facebook', value: 'facebook'},
                    {label: 'Instagram', value: 'instagram'},
                    {label: 'Google', value: 'google'},
                    {label: 'Otro', value: 'otro'},
                ],
                optionLabel: 'label',
                optionValue: 'value',
            },
        }
    },
]);

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.email('Email debe ser una dirección válida'),
  message: z.string().min(5, 'El mensaje debe tener al menos 5 caracteres'),
  conocido: z.string('Debes seleccionar una opción'),
})

async function handleSubmit() {
    if (!validateForm()) return
            
    sendResult.value = ''; // Limpiar mensajes de error previos
    
    const toSend = formValues();

    sending.value = true;

    // fetch a una API o un servidor    
    await new Promise(resolve => setTimeout(resolve, 500));

    sendResult.value = `Gracias, el formulario ha sido enviado. <pre> ${JSON.stringify(toSend, null, 2)} </pre>`;

    sending.value = false;

    resetForm();
}

function getField(id){
    return fields.value.find(f => f.properties.id === id);
}

function formValues(){
    return fields.value.reduce((acc, field) => {
        acc[field.properties.id] = field.component.value;
        return acc;
    }, {});
}

function validateForm() {
    const toValidate = formValues();
    
    fields.value.forEach(field => {
        field.properties.errorMessage = null;
    });

    const validationResult = schema.safeParse(toValidate);
    if (!validationResult.success) {
        for (const issue of validationResult.error.issues) {
            const field = fields.value.find(f => f.properties.id === issue.path[0]);
            if (field) {
                field.properties.errorMessage = issue.message;
            }
        }
        return false
    }
    return true
}

function resetForm() {
    fields.value.forEach(field => {        
        field.component.value = '';
        field.properties.errorMessage = null;
    })
}

function clear() {
    resetForm();
    sendResult.value = '';
}

const errorsSummary = computed(() => {
    const errors = fields.value
        .map(field => field.properties.errorMessage!=null ? field.properties.errorMessage : false);

    return errors.filter(error => error).join('<br>');
});

onMounted(() => {
    if(import.meta.env.DEV){
        getField('name').component.value = 'John Doe';
        getField('email').component.value = 'BxKl0@example.com';
        getField('message').component.value = 'Esto es un mensaje de prueba';
        getField('conocido').component.value = 'otro';
    }
});
</script>

<template>
    <form class="contact-form" @submit.prevent="handleSubmit">
        <fieldset class="grid">
            <Field v-for="field in fields" :key="field.id" :properties="field.properties" >
                <component v-if="field.component"
                    :is="field.component.type"
                    v-model="field.component.value"
                    v-bind="field.component.attributes"
                    v-on="field.component.events??{}"
                    />
            </Field>
        </fieldset>

        <div class="buttons">
            <button @click="clear" type="reset" class="reset" :disabled="sending">Limpiar</button>
            <button @click="sendForm" type="submit" class="submit" :disabled="sending">
                <Loader :loading="sending" color="white" size="10px" />
                <span v-if="!sending">Enviar</span>
            </button>
        </div>

        <div v-if="errorsSummary" class="errors" v-html="errorsSummary"></div>
        
        <div v-if="sendResult" class="results" v-html="sendResult"></div>
        <pre>{{ formValues() }}</pre>
    </form>
</template>


<style lang="scss">
.contact-form {
  max-width: 600px;
  margin: auto;
  padding:1.5rem 1rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  
  fieldset{
    width: 100%;
    border: none;
    padding: 0;
    margin: 0 0 1em 0;


    &.flex{
        display: flex;
        flex-direction: column;
        gap: 1.2em;
    }
      
    &.grid{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 
        "name email" 
        "message message"
        "conocido newsletter";
        gap: 1em;
    }

    label {
    font-weight: 600;
    margin-bottom: 0.5em;
    color: #333;
    display: block;
    }
    .field-group > input:not([type="checkbox"]), .field-group > textarea  {
             
        width: 100%;
        // padding: 0.75em 1em;
        // border: 1px solid #d1d5db;
        // font-size: .9rem;
        // font-family: inherit;
        // background: #f9fafb;
        // transition: border-color 0.2s, box-shadow 0.2s;
        // resize: none;
        // outline: none;
        // margin-bottom: 0.25em;
        // box-sizing: border-box;
    }
    textarea{
        max-height: 300px;
        overflow: auto;
        field-sizing: content;
    }
    // input:focus, textarea:focus {
    //     border-color: #6366f1;
    //     box-shadow: 0 0 0 2px #6366f133;
    //     background: #fff;
    // }
      
    .errorMessage {
        color: #dc2626;
        font-size: 0.8em;
        margin-top: 0.2em;
    }

    .w-full{
        width: 100%;
    }
  }


  .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      justify-content: flex-end;
      button {
        min-width: 120px;
        padding: 0.75em 1.5em;
        background: linear-gradient(0deg, #6366f1 0%, #60a5fa 100%);
        color: #fff;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
        }
        &.reset{
            background: grey;
            &:hover{
                background: darkgrey;

            }
        }
        &[disabled]{
            opacity: 0.5;
            cursor: not-allowed;
        }
      }
  }

  .errors{
        border: 1px solid red;
        padding: 5px;
    
      margin-block: 1em;
  }
  .results{
        border: 1px solid green;
        padding: 5px;
    
      margin-block: 1em;
  }  
}
</style>