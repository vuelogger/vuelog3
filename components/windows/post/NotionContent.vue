<template>
  <article v-if="page">
    <div class="cover" :class="page.cover ? null : 'no-image'">
      <img :src="page.cover" v-if="page.cover" />
    </div>
    <div class="info">
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
    </div>
    <div class="body">
      <Block v-for="b of blocks" :key="b.id" :block="b" />
    </div>
  </article>
</template>

<script setup>
import { dateToStr } from "@/src/util";
import Block from "@/components/windows/post/Block.vue";

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

$text-padding: 2rem;

article {
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: text;
  background-color: white;
  height: fit-content;

  .cover {
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

  .info {
    width: $breakpoint-tablet;
    max-width: 100%;
    position: relative;
    padding-bottom: 4rem;
    border-bottom: 1px solid lightgray;

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
  }

  .body {
    width: $breakpoint-tablet;
    position: relative;
    padding: 4rem $text-padding;
    background-color: white;
    max-width: 100%;
    box-sizing: border-box;
    font-size: 1.6rem;
    line-height: 1.8;
    line-break: anywhere;

    hr {
      height: 3rem;
      border: 0;
      background-image: url(/images/divider.png);
      background-position: 50%;
      background-size: contain;
      background-repeat: no-repeat;
      margin: 4rem 0;
    }

    .image {
      display: flex;
      max-width: 100%;
      margin: 2rem auto;
      border: 1px solid gray;
      border-radius: 8px;
    }

    .inline-code {
      color: #476582;
      padding: 0.25rem 0.5rem;
      margin: 0;
      font-size: 0.85em;
      background-color: rgba(27, 31, 35, 0.05);
      border-radius: 3px;
    }

    .codeblock {
      margin: 3rem 0;
      font-family: sans-serif;
      border-radius: 1rem;
      overflow: hidden;

      &__head {
        display: flex;
        align-items: center;
        background-color: #1e1e1e;
        color: white;
        padding: 1rem 1.5rem 0 1.5rem;
        margin-bottom: -0.5rem;
        .lang {
          color: #aaa;
          border-radius: 1rem;
          font-weight: bold;
          text-transform: uppercase;

          &.html {
            color: #d84f4f;
          }
          &.javascript {
            color: #dada63;
          }
          &.css {
            color: #5757d9;
          }
        }

        .code-caption {
          color: gray;
          font-size: 0.9em;
          margin-left: auto;
        }
      }

      pre {
        display: flex;
        flex-direction: column;
      }
    }

    ol,
    ul {
      list-style: initial;
    }
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
