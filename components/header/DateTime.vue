<template>
  <p>{{ dateStr }}</p>
</template>

<script setup>
import { dateToStr } from "@/src/util";

const datetime = ref(new Date());
const dateStr = computed(() => dateToStr(datetime.value, "lll"));

onMounted(() => {
  setInterval(() => {
    datetime.value = new Date();
  }, 1000 * 60);
});
</script>
