<template>
  <div class="callout" :class="data.color">
    <div>{{ data.icon[data.icon.type] }}</div>
    <pre>
      <Text :text="data.rich_text" />
    </pre>
  </div>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
const { data } = defineProps(["data"]);
</script>

<style lang="scss" scoped>
.callout {
  pre {
    white-space: pre-line;
  }
}
</style>
