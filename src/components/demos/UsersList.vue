<script setup>
import { useUsersStore } from '@/stores/demos/demo-users';
import BaseList from '@/components/demos/BaseList.vue';

const usersStore = useUsersStore();

</script>

<template>
  <div>   
    <div class="fetch-buttons">
        <button @click="usersStore.getUsers">Get Users</button>
        <button @click="usersStore.getSlowEndpoint">Call Slow Endpoint</button>
        <button @click="usersStore.reset">Reset</button>
    </div>

    <BaseList :items="usersStore.users" :api="usersStore.api">
      <template v-slot="{ item }">
        <h3>{{ item.name }} {{ item.username }}</h3>
        <p>Email: {{ item.email }}</p>
      </template>
    </BaseList>

  </div> 
</template>
