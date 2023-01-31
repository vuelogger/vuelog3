<template>
  <a class="bookmark" :href="bookmark.url" v-if="bookmark">
    <div class="left">
      <h4>{{ bookmark.title }}</h4>
      <p>{{ bookmark.description }}</p>
      <div class="url">
        <img :src="bookmark.icon" v-if="bookmark.icon" />
        <span>{{ bookmark.url }}</span>
      </div>
    </div>
    <div class="right" v-if="bookmark.image">
      <img :src="bookmark.image" />
    </div>
  </a>
</template>

<script setup>
const { data } = defineProps(["data"]);
const bookmark = ref(null);

useFetch("/api/bookmark", {
  method: "post",
  body: {
    url: data.url,
  },
}).then(({ data }) => {
  bookmark.value = data.value;
});
</script>

<style lang="scss" scoped></style>
