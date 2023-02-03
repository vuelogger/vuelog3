<template>
  <div class="content" v-if="blocks">
    <Block v-for="b of blocks" :key="b.id" :block="b" />
  </div>
</template>

<script setup>
import Block from "@/components/windows/post/Block.vue";
const { blocks } = defineProps(["blocks"]);
</script>
