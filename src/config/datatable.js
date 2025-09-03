import languageES from 'datatables.net-plugins/i18n/es-ES.mjs';

const buttons = [
    { text: 'Copiar', extend: 'copy', className: 'btn btn-primary' },
    // { text: 'PDF', title: 'Exportar a PDF', extend: 'pdfHtml5', className: 'btn btn-danger' },
    { text: 'Excel', title: 'Exportar a Excel', extend: 'excelHtml5', className: 'btn btn-success' },
    { text: 'Imprimir', title: 'Imprimir', extend: 'print', className: 'btn btn-info' }
];
// incluir PDF incrementa el build final. En caso de necesitarlo, hay que habilitar el import pdfmake

const language = {
    ...languageES,
    lengthMenu: '_MENU_ registros',
    paginate: {
        first: '<<',
        last: '>>',
        next: '>',
        previous: '<'
    }
};

const layout = {
    top1End: {buttons},
    topStart: {'pageLength': {menu: [5, 10, 25, 50, 100]}},
    topEnd: {search: {text: '', placeholder: 'Filtrar...'}},
    bottomStart: 'info',
    bottomEnd: 'paging'
};
const stateSave = true;
const responsive = true;
 
export default {
    buttons,
    language,
    layout,
    stateSave,
    responsive
};


