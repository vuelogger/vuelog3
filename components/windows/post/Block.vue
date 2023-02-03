<template>
  <Paragraph v-if="block.type == 'paragraph'" :block="block" />
  <Embed v-else-if="block.type == 'embed'" :block="block" />
  <Quote v-else-if="block.type == 'quote'" :block="block" />
  <Callout v-else-if="block.type == 'callout'" :block="block" />
  <Image v-else-if="block.type == 'image'" :block="block" />
  <Bookmark v-else-if="block.type == 'bookmark'" :block="block" />
  <CodeBlock v-else-if="block.type == 'code'" :block="block" />
  <List
    v-else-if="
      block.type == 'bulleted_list_item' || block.type == 'numbered_list_item'
    "
    :block="block"
  />

  <hr v-else-if="block.type == 'divider'" />
  <Heading v-else-if="block.type.startsWith('heading_')" :block="block" />
  <Youtube v-else-if="block.type == 'video'" :block="block" />
  <Audio v-else-if="block.type == 'audio'" :block="block" />
</template>

<script setup>
import Paragraph from "@/components/windows/post/blocks/Paragraph.vue";
import Heading from "@/components/windows/post/blocks/Heading.vue";
import Embed from "@/components/windows/post/blocks/Embed.vue";
import Quote from "@/components/windows/post/blocks/Quote.vue";
import Callout from "@/components/windows/post/blocks/Callout.vue";
import Image from "@/components/windows/post/blocks/Image.vue";
import Bookmark from "@/components/windows/post/blocks/Bookmark.vue";
import List from "@/components/windows/post/blocks/List.vue";
import Youtube from "@/components/windows/post/blocks/Youtube.vue";
import Audio from "@/components/windows/post/blocks/Audio.vue";
import CodeBlock from "@/components/windows/post/blocks/CodeBlock.vue";

const { block } = defineProps(["block"]);
</script>

<style lang="scss" scoped></style>
