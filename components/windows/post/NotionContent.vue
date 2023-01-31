<template>
  <div class="content" v-if="post">
    <Block
      v-for="(b, i) of post.blocks"
      :key="b.id"
      :block="b"
      :prev-block="post.blocks?.[i - 1]"
    />
  </div>
</template>

<script setup>
import Block from "@/components/windows/post/Block.vue";
const { post } = defineProps(["post"]);
</script>

<style lang="scss" scoped></style>
