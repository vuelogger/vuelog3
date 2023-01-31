<template>
  <blockquote>
    <pre>
      <Text :text="data.rich_text" />
    </pre>
  </blockquote>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
const { data } = defineProps(["data"]);
</script>

<style lang="scss" scoped>
blockquote {
  pre {
    white-space: pre-line;
  }
}
</style>
