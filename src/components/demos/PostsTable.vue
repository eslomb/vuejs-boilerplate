<script setup>
import { defineAsyncComponent, ref } from "vue";
import { usePostsStore } from '@/stores/demos/demo-posts';
import datatableDefaultOptions from '@/config/datatable';
// import BaseTable from './BaseTable.vue';
const BaseTable = defineAsyncComponent(() => import('./BaseTable.vue', {eager: true, delay: 2000}));

const postsStore = usePostsStore();

const currentPost = ref();

// ***** Datatable configuration******

const columns = (
    [
        { data: 'id', title: 'ID' },
        { data: 'title', title: 'Título' },
        { data: null, title: 'Acciones', defaultContent: ''},
    ]   
);

const options = {
    ...datatableDefaultOptions,
    id:"postsTable",
    columnDefs: [
        {
            target: -1, orderable: false ,
            createdCell: (td, cellData, rowData, row, col) => {
                td.innerHTML = '';
                const button = document.createElement('button');
                button.textContent = 'Ver Datos';
                button.classList.add('btn', 'btn-post-info');
                button.addEventListener('click', (event) => { viewPost(rowData, event )})
                td.appendChild(button);
            }
        }
    ],
};
function viewPost(rowData , event){
    currentPost.value =  `${rowData.id} - (${rowData.title})`
}

</script>


<template>

    <div class="fetch-buttons">
        <button @click="postsStore.getPosts">Get Posts</button>
        <button @click="postsStore.ceatePost">Create Post</button>
        <button @click="postsStore.reset">Reset</button>
    </div>

    <p>
        {{ currentPost }}
    </p>

    <BaseTable
        :loading="postsStore.api.loading"
        :data="postsStore.posts" 
        :columns="columns" 
        :options="options"
    ></BaseTable>

</template>

<style>
.btn-post-info{
    background-color: darkslateblue; color: white; border: 0; padding: 8px 10px; border-radius: 6px; cursor: pointer;
}
.btn:disabled{
    cursor: not-allowed;
    opacity: .5;
}
</style>