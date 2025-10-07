<script setup>
import { defineAsyncComponent, ref } from "vue";
import { useUsersStore } from '@/stores/demos/demo-users';
import datatableDefaultOptions from '@/config/datatable';
import BaseTable from './BaseTable.vue';
// const BaseTable = defineAsyncComponent(() => import('./BaseTable.vue', {eager: true, delay: 2000}));

const usersStore = useUsersStore();

const currentUser = ref();

// ***** Datatable configuration******

const columns = (
    [
        { data: 'name', title: 'Nombre' },
        { data: 'username', title: 'Usuario' },
        { data: 'email', title: 'Email', render: (data) => `<a href="mailto:${data}">${data}</a>` },
        { data: null, title: 'Acciones', defaultContent: ''},
    ]   
);

const options = {
    ...datatableDefaultOptions,
    id:"usersTable",
    columnDefs: [
        {
            target: -1, orderable: false ,
            createdCell: (td, cellData, rowData, row, col) => {
                td.innerHTML = '';
                const button = document.createElement('button');
                button.textContent = 'Ver Datos';
                button.classList.add('btn', 'btn-user-info');
                button.addEventListener('click', (event) => { viewUser(rowData, event )})
                td.appendChild(button);
            }
        }
    ],
};
function viewUser(rowData , event){
    currentUser.value =  `${rowData.name} (${rowData.username})`
}

</script>


<template>

    <div class="fetch-buttons">
        <button @click="usersStore.getUsers">Get Users</button>
        <button @click="usersStore.getSlowEndpoint">Call Slow Endpoint</button>
        <button @click="reset">Reset</button>
    </div>

    <p>
        {{ currentUser }}
    </p>

    <BaseTable
        :loading="usersStore.api.loading"
        :data="usersStore.users" 
        :columns="columns" 
        :options="options"
    ></BaseTable>

</template>

<style>
.btn-user-info{
    background-color: darkslateblue; color: white; border: 0; padding: 8px 10px; border-radius: 6px; cursor: pointer;
}
.btn:disabled{
    cursor: not-allowed;
    opacity: .5;
}
</style>