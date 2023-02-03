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
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 1 1 200px;
      max-width: 250px;
      aspect-ratio: 1 / 1.2;
      background-color: gray;
      border-radius: 8px;
      a {
        display: block;
        height: 100%;
      }
    }
  }
}
</style>
