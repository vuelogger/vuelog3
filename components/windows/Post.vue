<script setup>
import Content from "./post/NotionContent.vue";
import List from "./post/NotionList.vue";
import SideBar from "./post/SideBar.vue";

const route = useRoute();
const category = ref([]);

useFetch("/api/category", { method: "post" }).then(({ data }) => {
  category.value = data.value;
});

const isPost = computed(() => {
  return route.params.id != null;
});
</script>

<template>
  <div class="post">
    <SideBar :category="category" />
    <Content v-if="isPost" />
    <List v-else-if="!isPost && category.length > 0" :category="category" />
  </div>
</template>

<style lang="scss">
.post {
  width: 100%;
  background-color: white;
}
</style>
