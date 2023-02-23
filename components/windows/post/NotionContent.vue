<template>
  <div v-if="page" class="content">
    <div class="content__cover" :class="page.cover ? null : 'no-image'">
      <img :src="page.cover" v-if="page.cover" />
    </div>
    <div class="content__info">
      <NuxtLink class="category" :to="`/post/${page.category}`">
        <img :src="`/images/apps/post/${page.category}.svg`" />
      </NuxtLink>

      <h1 class="title">{{ page.title }}</h1>
      <div class="table">
        <div class="label">
          <img src="@/assets/images/windows/post/article/category.svg" />
          <span>Category</span>
        </div>
        <div class="value">{{ page.category }}</div>
        <div class="label">
          <img src="@/assets/images/windows/post/article/tags.svg" />
          <span>Tags</span>
        </div>
        <div class="value">
          <div class="tag" v-for="tag of page.tags" :key="tag">{{ tag }}</div>
        </div>
        <div class="label">
          <img src="@/assets/images/windows/post/article/calendar.svg" />
          <span>Created</span>
        </div>
        <div class="value">{{ dateToStr(page.created, "YYYY. MM. DD") }}</div>
        <div class="label">
          <img src="@/assets/images/windows/post/article/calendar.svg" />
          <span>Updated</span>
        </div>
        <div class="value">{{ dateToStr(page.updated, "YYYY. MM. DD") }}</div>
      </div>
      <hr />
    </div>
    <div class="content__body">
      <Article :blocks="blocks" />
    </div>
  </div>
</template>

<script setup>
import Article from "./Article.vue";
import { dateToStr } from "@/src/util";

const route = useRoute();
const blocks = ref([]);
const page = ref(null);

useFetch("/api/page", {
  method: "post",
  body: { blockId: route.params.id },
}).then(({ data }) => {
  page.value = data.value;
});

useFetch("/api/blocks", {
  method: "post",
  body: { blockId: route.params.id },
}).then(({ data }) => {
  blocks.value = data.value;
});
</script>

<style lang="scss">
@import "@/assets/scss/base/variable.scss";
@import "@/assets/scss/base/mixins.scss";

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: text;
  background-color: white;
  height: fit-content;

  &__cover {
    width: 100%;
    height: 300px;

    &.no-image {
      height: 100px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info,
  &__body {
    padding: 0 2rem;
    box-sizing: border-box;
  }

  &__info {
    width: $breakpoint-tablet;
    max-width: 100%;
    position: relative;
    font-family: "Pretendard", sans-serif;

    .category {
      transform: translateY(-50%);
      position: absolute;
      width: 5rem;
      height: 5rem;
      padding: 1rem;
      border-radius: 1rem;
      background-color: ghostwhite;
      box-shadow: 2px 2px 2px gray;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      margin-top: 8rem;
      font-size: 3rem;
      color: #222;
      line-height: 1.4;
      @include headerFont;
    }

    .table {
      display: grid;
      grid-template-columns: 1fr 4fr;
      margin-top: 3rem;
      align-items: center;
      column-gap: 2rem;
      row-gap: 2rem;
      font-size: 1.3rem;

      .label {
        display: flex;
        align-items: center;
        opacity: 0.45;
        img {
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 1.5rem;
        }
      }

      .value {
        display: flex;
        align-items: center;
      }
    }

    hr {
      border: 0;
      border-bottom: 1px solid lightgray;
      margin-top: 3rem;
    }
  }

  &__body {
    width: $breakpoint-tablet;
    position: relative;
    background-color: white;
    max-width: 100%;
    box-sizing: border-box;
  }
}

@media (max-width: $breakpoint-tablet) {
  article {
    .header {
      .text {
        .title {
          font-size: 3rem;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
