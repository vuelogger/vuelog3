<script setup>
import SideBar from "./post/sidebar.vue";
import { NotionRenderer, getPageBlocks, getPageTable } from "vue3-notion";

let content = ref(null);
let list = ref(null);
const start = new Date();
const page = await useFetch("/api/page");
const table = await useFetch("/api/table");

content = page.data;
list = table.data;

// console.log("block", block.value);
// console.log("list", list.value);
// const list = ref(data.value.list);
</script>

<template>
  <NotionRenderer v-if="content" :blockMap="content" fullPage />
  <SideBar :list="list" />
</template>
