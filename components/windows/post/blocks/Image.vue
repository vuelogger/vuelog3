<template>
  <div>
    <img :src="data?.file?.url" :alt="alt" />
    <caption>
      {{
        alt
      }}
    </caption>
  </div>
</template>

<script setup>
const { data } = defineProps(["data"]);
const alt = computed(() => data?.caption?.[0].plain_text);
</script>

<style lang="scss" scoped></style>
