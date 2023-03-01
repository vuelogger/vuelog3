<script setup>
import Content from "./post/NotionContent.vue";
import List from "./post/NotionList.vue";
import SideBar from "./post/SideBar.vue";
import { usePostStore } from "@/stores/post";

const { setCategory } = usePostStore();
const route = useRoute();

const { data } = await useFetch("/api/category");

watch(
  route,
  () => {
    setCategory(data.value);
  },
  { immediate: true }
);
const isPost = computed(() => {
  return route.params.id && route.params.id.includes("-");
});
</script>

<template>
  <div class="post">
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
