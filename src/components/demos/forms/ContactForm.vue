<script setup>
import { ref, computed, onMounted } from "vue";
import { z } from 'zod';
import Field from "./Field.vue";
import Loader from "@/components/shared/Loader.vue";

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
            type: 'input',
            value: 'Esteban',
            attributes: {
                type: 'text',
                placeholder: 'Nombre y Apellido',
            },
            events: {
                input: 'eventField1'
            }
        }
    },
    {
        properties: {
            id: "email",
            label: "E-mail",
            errorMessage: null,
        },
        component:{
            type: 'input',
            value: 'esteban@lombardi.com',
            attributes: {
                type: 'email',
                placeholder: 'Dirección de correo electrónico',
            },
            events: {
                input: 'eventField2'
            }
        }
    },
    {
        properties: {
            id: "message",
            label: "Mensaje",
            errorMessage: null,
        },
        component:{
            type: 'textarea',
            value: 'mensaje de prueba',
            attributes: {
                // type: 'email',
                placeholder: 'Ingresa tu mensaje',
            },
            events: {
                input: 'eventField3'
            }
        }
    },
]);

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.email('Email debe ser una dirección válida'),
  message: z.string().min(5, 'El mensaje debe tener al menos 5 caracteres')
})

const eventHandlers = {
  eventField1: (e) => {fields.value[0].component.value = e.target.value;},
  eventField2: (e) => {fields.value[1].component.value = e.target.value;},
  eventField3: (e) => {fields.value[2].component.value = e.target.value;},
}

async function handleSubmit() {
    if (!validateForm()) return
        
    const toSend = fields.value.reduce((acc, field) => {
        acc[field.properties.id] = field.component.value;
        return acc;
    }, {});

    sending.value = true;

    // fetch a una API o un servidor    
    await new Promise(resolve => setTimeout(resolve, 2000));

    sendResult.value = `Gracias, el formulario ha sido enviado. <pre> ${JSON.stringify(toSend, null, 2)} </pre>`;

    sending.value = false;

    resetForm();
}

function attachEvents() {    
    fields.value.forEach(field => {
        if (field.component.events) {
            Object.keys(field.component.events).forEach(eventName => {
            const handlerName = field.component.events[eventName];
            field.component.events[eventName] = eventHandlers[handlerName];
            });
        }
    });
}

function validateForm() {
    const form = fields.value.reduce((acc, field) => {
        acc[field.properties.id] = field.component.value;
        return acc;
    }, {});

    // Limpiar mensajes de error previos
    
    sendResult.value = '';
    
    fields.value.forEach(field => {
        field.properties.errorMessage = null;
    });

    const validationResult = schema.safeParse(form)
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
    attachEvents();
});

</script>

<template>
    <form class="custom-form" @submit.prevent="handleSubmit">
        <fieldset class="grid">
            <Field v-for="field in fields" :key="field.id" 
            :properties="field.properties" :component="field.component"></Field>
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
    </form>

</template>


<style lang="scss">
.custom-form {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
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
            "message message";
            gap: 1em;
        }

      label {
        font-weight: 600;
        margin-bottom: 0.5em;
        color: #333;
        display: block;
      }
      input, textarea {
        width: 100%;
        padding: 0.75em 1em;
        border: 1px solid #d1d5db;
        font-size: 1rem;
        font-family: inherit;
        background: #f9fafb;
        transition: border-color 0.2s, box-shadow 0.2s;
        resize: none;
        outline: none;
        margin-bottom: 0.25em;
        box-sizing: border-box;
      }
      textarea{
          max-height: 300px;
          overflow: auto;
          field-sizing: content;
      }
      input:focus, textarea:focus {
        border-color: #6366f1;
        box-shadow: 0 0 0 2px #6366f133;
        background: #fff;
      }
      
      .errorMessage {
          color: #dc2626;
          font-size: 0.8em;
          margin-top: 0.2em;
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