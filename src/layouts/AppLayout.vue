<script setup>
  import { router } from '@/routes/router.js';
</script>

<template>
    
  <header>
    <h1>VueJS Boilerplate</h1>
  
    <nav>
      <RouterLink v-for="route in router.options.routes" :key="route.name" :to="route.path">{{ route.name }}</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView></RouterView>
  </main>

  <footer>
    <p>Footer</p>
  </footer>

</template>

<style scoped >
  header{
    text-align: center;
  }
  nav{
    border-bottom: 1px solid black;
    display: flex;
    justify-content: center;
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
  main{
    padding-block: 1em;
    max-width: 1200px;
    margin: 0 auto;
  }
  footer{
    background-color: black;
    color: white;
    padding: 1em;
    text-align: center;
  }


</style>