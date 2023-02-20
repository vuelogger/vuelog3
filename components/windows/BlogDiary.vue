<template>
  <div class="blog-diary">
    <h1>My Blog Diary</h1>
    <ul v-if="diary.length > 0">
      <li v-for="d of diary" :key="d.title">
        <div class="created">
          {{ dateToStr(d.created, "YYYY. MM. DD") }}
        </div>
        <h3>{{ d.title }}</h3>
        <img v-if="d.image" :src="d.image" />
        <p>{{ d.content }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { dateToStr } from "@/src/util";
const diary = ref([]);
useFetch("/api/diary").then(({ data }) => {
  diary.value = data.value;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/mixins.scss";
.blog-diary {
  background-color: #222;
  height: fit-content;
  color: white;
  width: 100%;
  padding: 5rem 3rem;
  box-sizing: border-box;
  h1 {
    font-size: 4rem;
    line-height: 1.4;
    @include headerFont;
  }

  ul {
    font-size: 1.6rem;
    margin-left: 1rem;
    padding-left: 2rem;
    border-left: 2px solid white;
    li {
      margin-top: 4rem;
      .created {
        font-size: 0.8em;
        color: darkgray;
      }
      h3 {
        position: relative;
        font-size: 1.1em;
        margin-top: 1rem;
        color: wheat;

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          right: calc(100% + 2rem + 1px);
          width: 1rem;
          height: 1rem;
          background-color: white;
          transform: translate(50%, -50%);
          border-radius: 50%;
        }
      }
      img {
        width: 100%;
        border-radius: 1rem;
        margin-top: 2rem;
      }
      p {
        margin-top: 0.8rem;
        font-size: 0.85em;
        line-break: anywhere;
        color: lightgray;
        line-height: 1.8;
      }
    }
  }
}
</style>
