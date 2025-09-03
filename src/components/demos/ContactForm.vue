<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Nombre:</label>
      <input type="text" id="name" v-model="form.name" required />
      <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="form.email" required />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </div>
    <div>
      <label for="message">Mensaje:</label>
      <textarea
        id="message"
        v-model="form.message"
        required
        @input="autoResize"
        ref="messageTextarea"
        rows="1"
      ></textarea>
      <span v-if="errors.message" class="error">{{ errors.message }}</span>
    </div>
    <button type="submit">Enviar</button>
  </form>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { z } from 'zod'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const errors = ref({
  name: '',
  email: '',
  message: ''
})

const messageTextarea = ref(null)

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.email('Email inválido'),
  message: z.string().min(5, 'El mensaje debe tener al menos 5 caracteres')
})

function autoResize() {
    return ;
    const textarea = messageTextarea.value
    if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = textarea.scrollHeight + 'px'
    }
}

function validateForm() {
  errors.value = { name: '', email: '', message: '' }
  const result = schema.safeParse(form.value)
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.value[issue.path[0]] = issue.message
    }
    return false
  }
  return true
}

function handleSubmit() {
  if (!validateForm()) return
  alert(`Nombre: ${form.value.name}\nEmail: ${form.value.email}\nMensaje: ${form.value.message}`)
  form.value.name = ''
  form.value.email = ''
  form.value.message = ''
  nextTick(() => autoResize())
  errors.value = { name: '', email: '', message: '' }
}

onMounted(() => {
  autoResize()
})
</script>

<style scoped>
form {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5em;
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
button {
  width: 120px;
  align-self: flex-end;
  padding: 0.75em 1.5em;
  background: linear-gradient(0deg, #6366f1 0%, #60a5fa 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
button:hover {
  background: linear-gradient(90deg, #60a5fa 0%, #6366f1 100%);
}

.error {
  color: #dc2626;
  font-size: 0.9em;
  margin-top: 0.2em;
}
</style>