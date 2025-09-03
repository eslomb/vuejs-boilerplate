<script setup>
import { usePostsStore } from '@/stores/demos/demo-posts';
import BaseList from '@/components/demos/BaseList.vue';

const postsStore = usePostsStore();

</script>

<template>
  <div>
    <div class="fetch-buttons">
        <button @click="postsStore.getPosts">Get Posts</button>
        <button @click="postsStore.createPost">Create Post</button>
        <button @click="postsStore.reset">Reset</button>
    </div>

    <BaseList :items="postsStore.posts" :api="postsStore.api">
      <template v-slot="{ item }">
        <h3>{{item.id}} - {{ item.title }}</h3>
        <div>{{ item.body }}</div>
      </template>
    </BaseList>

  </div> 
</template>
