<template>
  <div class="post-list">
    <ul>
      <li v-for="item of list" :key="item.number">
        <NuxtLink :to="getTo(item)" @click="$emit('changePost', item.number)">
          {{ item }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { list } = defineProps(["list"]);
const getTo = (item) => `/post/${item.category.toLowerCase()}/${item.number}`;
</script>

<style lang="scss" scoped>
.post-list {
  color: black;
}
</style>
