<script setup>

const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    api: {
        type: Object,
        default: {
            loading: false,
            errorCode: 0,
            errorMessage: '',
            data: null
        }
    }
});

</script>

<template>
    
    <SharedLoader :loading="api.loading" color="black" size="18px" />

    <p><span v-if="api.errorCode">Result Code: {{ api.errorCode }}</span></p>

    <div v-if="api.errorMessage">Error: {{ api.errorMessage }} ({{ api.errorCode }})</div>
    
    <div v-if="api.errorCode === 201 && api.data">
        <pre>{{ api.data }}</pre>
    </div>

    <ul v-if="items.length" class="items-list">
      <li v-for="item in items" :key="item.id" class="items-item">
        <slot :item="item"></slot>
      </li>
    </ul>

</template>


<style lang="scss">
  pre{
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    background-color: antiquewhite;
    padding: 10px;
    border: 1px solid #ccc;
  }

  .items-list {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    list-style: none;
    flex-wrap: wrap;
    gap: 1em;
    .items-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #326270;
      color: white;
      flex-basis: 30%;
      padding: 10px 15px;
      line-height: 1.3;
      & > h3 {
        margin: 0 0 .5em ;
        padding: 0;
        font-size: 1.2rem;
      }
      p {
        margin: 5px 0 0;
        color: inherit;
      }
    }
  }
</style>