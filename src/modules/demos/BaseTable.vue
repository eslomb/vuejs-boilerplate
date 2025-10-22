<script setup>

import { ref, onMounted } from "vue";

/// Datatables dependencies /////////
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-dt';
import DataTableLib from 'datatables.net-dt';
DataTable.use(DataTablesCore);
DataTable.use(DataTableLib);

import Buttons from 'datatables.net-buttons';
import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
import JSZip from 'jszip';
window.JSZip = JSZip;
import print from 'datatables.net-buttons/js/buttons.print';
// import pdfmake from 'pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// // pdfmake.vfs = pdfFonts.pdfMake.vfs;

// DataTable.use(pdfmake);
DataTable.use(ButtonsHtml5);
import 'datatables.net-responsive-dt';
///////////////////////////// 

const datatableRef = ref(null);

const props = defineProps({
    loading: { type: Boolean, default: false },
    data : { type: Array, default: [] },
    columns: { type: Array, default: [] },
    options: { type: Object, default: {} },
})


onMounted(() => {
    if(!props.options.id && props.options.stateSave){console.log("No se puede usar stateSave sin definir el id de la tabla");};
});

</script>

<template>

    <SharedLoader :loading="loading" color="pink" size="18px" />

    <DataTable class="display" ref="datatableRef" :id="props.options.id"
        :data="data"
        :columns="columns"
        :options="options" 
    ></DataTable>


</template>

<style>
@import 'datatables.net-dt';

.dt-buttons{
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: flex-end;
}
.dt-button{
    margin-block: 10px;
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid white;
    cursor: pointer;
    color: white;
    background-color: rgb(9, 71, 126);
}
</style>