<script setup>
  import {router} from './router';
</script>

<template>

  <h1>VueJS Boilerplate</h1>
  
  <nav>
    <RouterLink v-for="route in router.options.routes" :key="route.name" :to="route.path">{{ route.name }}</RouterLink>
  </nav>

  <RouterView></RouterView>

</template>

<style scoped >
  nav{
    border-bottom: 1px solid black;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    padding-bottom: 1em; 
    a{
      background-color: hsl(0, 74%, 40%);
      color: hsl(0, 0%, 100%);
      padding: 8px 10px;
      text-decoration: none;
      text-align: center;
      font-size: 1rem;
      transition: .2s;
      &:hover{
        background-color: hsl(0, 74%, 60%);
        
      }
      &.router-link-active{
        background-color: hsl(202, 51%, 30%);        
      }
    }
  }


</style>


