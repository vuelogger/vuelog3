<template>
  <article>
    <div class="header" v-if="page">
      <img class="cover" :src="page.cover" />
      <div class="text">
        <div class="category" :class="page.category.toLowerCase()">
          {{ page.category }}
        </div>
        <h1 class="title">{{ page.title }}</h1>

        <div class="created">
          <img src="@/assets/images/windows/post/article/calendar.svg" />
          <span>{{ format(page.created) }}</span>
        </div>
        <ul class="tags">
          <li v-for="tag of page.tags">{{ tag }}</li>
        </ul>
      </div>
    </div>
    <div class="body">
      <Block v-for="b of blocks" :key="b.id" :block="b" />
    </div>
  </article>
</template>

<script setup>
import Block from "@/components/windows/post/Block.vue";
import dayjs from "dayjs";

const format = (date) => dayjs(date).format("YYYY. MM. DD");

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

$text-padding: 2rem;

article {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  user-select: text;

  .header {
    position: relative;
    width: 100%;
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .cover {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
      filter: brightness(0.6);
    }
    .text {
      position: relative;
      display: flex;
      flex-direction: column;
      width: $breakpoint-tablet;
      max-width: 100%;
      padding: 0 $text-padding;
      box-sizing: border-box;
      color: white;
      .category {
        font-size: 1.8rem;
        width: fit-content;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: bold;
      }

      .title {
        font-size: 4rem;
        line-height: 1.4;
        margin-top: 2rem;
        font-family: "SBAggroB", "GmarketSans", Arial, Helvetica, sans-serif;
        text-shadow: 4px 4px 4px black;
      }

      .created {
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        text-shadow: 2px 2px 2px gray;
        margin-left: 1rem;
        color: #eee;
        margin-top: 1rem;
        img {
          height: 2rem;
          margin-right: 1rem;
        }
      }

      .tags {
        margin-top: 2rem;
        display: flex;
        column-gap: 1rem;
        li {
          color: #679fff;
          text-shadow: 1px 1px 1px black, -1px -1px 1px black;
          font-size: 1.3rem;

          &::before {
            content: "#";
            margin-right: 0.2rem;
          }
        }
      }
    }
  }

  .body {
    width: $breakpoint-tablet;
    position: relative;
    padding: 4rem $text-padding;
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
