<template>
  <ol>
    <li>
      <Text :text="data.rich_text" />
      <template v-if="block.children">
        <Block
          v-for="(b, i) of block.children"
          :key="b.id"
          :block="b"
          :prev-block="block.children?.[i - 1]"
        />
      </template>
    </li>
  </ol>
</template>

<script setup>
import Text from "@/components/windows/post/blocks/Text.vue";
import Block from "@/components/windows/post/Block.vue";
const { data, block } = defineProps(["data", "block"]);
</script>

<style lang="scss" scoped>
ul,
ol {
  padding-left: 2rem;
}
</style>
