<template>
  <template v-for="t of text" :key="t.plain_text">
    <strong v-if="t.annotations.bold">{{ t.plain_text }}</strong>
    <em v-else-if="t.annotations.italic">{{ t.plain_text }}</em>
    <del v-else-if="t.annotations.strikethrough">{{ t.plain_text }}</del>
    <u v-else-if="t.annotations.underline">{{ t.plain_text }}</u>
    <code v-else-if="t.annotations.code" class="inline-code">{{
      t.plain_text
    }}</code>
    <a v-else-if="t.href" :href="t.href" target="_blank" class="link">{{
      t.plain_text
    }}</a>
    <template v-else>{{ t.plain_text }}</template>
  </template>
</template>

<script setup>
const { text } = defineProps(["text"]);
</script>

<style lang="scss" scoped></style>
