<script setup>
import Content from "./post/NotionContent.vue";
import Content2 from "./post/NotionContent2.vue";
import List from "./post/NotionList.vue";
import SideBar from "./post/SideBar.vue";
const route = useRoute();

const isPost = computed(() => {
  return Number.isInteger(parseInt(route.params.id));
});
</script>

<template>
  <div class="post" ref="post">
    <SideBar />
    <Content v-if="isPost" />
    <List v-else-if="!isPost" />
  </div>
</template>

<style lang="scss">
.post {
  width: 100%;
  background-color: white;
}
</style>
