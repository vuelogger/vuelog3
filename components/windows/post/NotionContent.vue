<template>
  <div v-if="page" class="content">
    <div class="content__cover" :class="page.cover ? null : 'no-image'">
      <img :src="page.cover" v-if="page.cover" />
    </div>
    <div class="content__info">
      <NuxtLink class="category" :to="`/post/${page.category.toLowerCase()}`">
        <img :src="`/images/apps/post/${page.category}.svg`" />
      </NuxtLink>

      <h1 class="title">{{ page.title }}</h1>
      <div class="table">
        <div class="label">
          <img src="@/assets/images/windows/post/article/category.svg" />
          <span>Category</span>
        </div>
        <div class="value cate notion-select">{{ page.category }}</div>
        <div class="label">
          <img src="@/assets/images/windows/post/article/tags.svg" />
          <span>Tags</span>
        </div>
        <div class="value tags">
          <div
            class="tag notion-select"
            v-for="tag of page.tags"
            :key="tag"
            :class="tag.color"
          >
            {{ tag.name }}
          </div>
        </div>
        <div class="label">
          <img src="@/assets/images/windows/post/article/calendar.svg" />
          <span>Created</span>
        </div>
        <div class="value date">
          {{ dateToStr(page.created, "YYYY-MM-DD") }}
        </div>
        <div class="label">
          <img src="@/assets/images/windows/post/article/calendar.svg" />
          <span>Updated</span>
        </div>
        <div class="value date">
          {{ dateToStr(page.updated, "YYYY-MM-DD") }}
        </div>
      </div>
      <hr />
    </div>
    <div class="content__body">
      <Article />
    </div>
  </div>
</template>

<script setup>
import Article from "./Article.vue";
import { dateToStr } from "@/src/util";

const route = useRoute();
const page = ref(null);

const { data } = await useFetch("/api/page", {
  method: "post",
  body: { blockId: route.params.id },
});

page.value = data.value;

useHead({
  titleTemplate: "Vuelog - " + data.value?.title,
  meta: [
    {
      hid: "og:image",
      property: "og:image",
      content: data.value?.cover,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: data.value?.cover,
    },
    {
      hid: "og:title",
      property: "og:title",
      content: data.value?.title,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://vue-log.com/post/" + route.params.id,
    },
    {
      hid: "description",
      name: "description",
      content: data.value?.description,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: data.value?.description,
    },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: data.value?.description,
    },
  ],
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
      font-size: 4rem;
      font-weight: bold;
      color: #222;
      line-height: 1.4;
    }

    .table {
      display: grid;
      grid-template-columns: 1fr 4fr;
      margin-top: 3rem;
      align-items: center;
      column-gap: 2rem;
      row-gap: 2rem;
      font-size: 1.4rem;

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
        width: fit-content;

        &.cate {
          font-weight: bold;
        }

        &.tags {
          flex-wrap: wrap;
          gap: 0.2rem 0.5rem;
        }

        &.date {
          color: #555;
        }
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
