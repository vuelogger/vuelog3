<template>
  <div class="book" ref="container">
    <aside :class="{ tablet: isTabletMode, active: sidebarActive }">
      <button
        class="item"
        :class="buttonClass(item)"
        :disabled="!item.published"
        v-for="item of list"
        :key="item.id"
        @click="getPage(item.id, item.number)"
      >
        {{ item.title }}
      </button>
    </aside>
    <div class="content">
      <template v-if="blocks">
        <header v-if="currPage">
          <h1>{{ currPage.title }}</h1>
          <div class="created">
            Created: {{ dateToStr(currPage.created, "YYYY. MM. DD hh:mm A") }}
          </div>
          <div class="updated">
            Updated: {{ dateToStr(currPage.updated, "YYYY. MM. DD hh:mm A") }}
          </div>
        </header>
        <Article :blocks="blocks" />
        <div class="prev-next">
          <div class="prev" v-if="prevPage">{{ prevPage }}</div>
          <div class="next" v-if="nextPage">{{ nextPage }}</div>
        </div>
      </template>
      <div class="content skeleton" v-else>
        <div class="title"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="heading"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="image"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
        <div class="text"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dateToStr } from "@/src/util";
import throttle from "lodash/throttle";

import { storeToRefs } from "pinia";
import { useBookStore } from "@/stores/book";
import Article from "@/components/windows/post/Article.vue";

const bookStore = useBookStore();
const { sidebarActive } = storeToRefs(bookStore);
const router = useRouter();
const route = useRoute();

const list = ref([]);
const blocks = ref([]);
const currNum = ref(route.params.number || 0);
const isTabletMode = ref(true);

const prevPage = computed(() => {
  return list.value[parseInt(currNum.value) - 1];
});
const nextPage = computed(() => {
  return list.value[parseInt(currNum.value) + 1];
});
const currPage = computed(() => {
  return list.value[parseInt(currNum.value)];
});

const buttonClass = (item) => {
  const result = [];
  if (item.number == currNum.value) {
    result.push("active");
  }

  result.push(item.depth);

  return result;
};

const getPage = function (id, number) {
  bookStore.closeSidebar();
  currNum.value = number;
  router.push("/book/vue-notion/" + number);

  blocks.value = null;
  useFetch("/api/book/content", {
    method: "post",
    body: { id },
  }).then(({ data }) => {
    blocks.value = data.value;
  });
};

watch(
  route,
  () => {
    if (list.value.length == 0) {
      useFetch("/api/book/list").then(({ data }) => {
        list.value = data.value;
        getPage(list.value[currNum.value].id, currNum.value);
      });
    }
  },
  { immediate: true }
);

const observer = new MutationObserver(
  throttle((mutationsList) => {
    for (const { target } of mutationsList) {
      isTabletMode.value = target.offsetWidth < 768;
    }
  }, 200)
);

onMounted(() => {
  const win = document.querySelector(".window");
  observer.observe(win, { attributes: true });
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/transitions.scss";
@import "@/assets/scss/base/variable.scss";
@import "@/assets/scss/base/mixins.scss";

.book {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  display: flex;

  aside {
    flex: 0 0 35rem;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    padding: 2rem 0;

    &.tablet {
      display: none;

      &.active {
        display: block;
      }
    }

    .item {
      width: 100%;
      text-align: left;
      font-size: 1.4rem;
      padding: 1.4rem 2rem;
      line-height: 1.3;
      cursor: pointer;

      &:first-of-type {
        font-size: 1.6rem;
        position: relative;
        margin-bottom: 2rem;

        &::before {
          content: "";
          position: absolute;
          bottom: -1rem;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: lightgray;
        }
      }

      &.depth-2 {
        padding-left: 3.5rem;
      }
      &.depth-3 {
        padding-left: 7rem;
      }

      &.active {
        color: white;
        background-color: #337ab7 !important;
      }
      &:hover {
        background-color: #f5f5f5;
      }

      &:disabled {
        cursor: auto;
        color: #ccc;
        background-color: transparent;
      }
    }
  }

  .content {
    padding: 3rem;
    width: 768px;
    min-width: 300px;
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 3rem;

    header {
      padding-bottom: 2rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid #dedede;
      h1 {
        font-size: 3rem;
        font-weight: bold;
        line-height: 1.4;
        text-align: center;
        margin-bottom: 1rem;
      }
      .created,
      .updated {
        font-size: 1.1rem;
        color: gray;
        text-align: center;
      }
    }
    &.skeleton {
      .title {
        height: 4rem;
        margin-bottom: 7rem;
        @include skeleton;
      }

      .text {
        height: 1rem;
        margin-top: 0.8rem;
        @include skeleton;

        &:nth-of-type(2n) {
          width: 80%;
        }
        &:nth-of-type(3n) {
          width: 70%;
        }
      }
      .image {
        height: 20rem;
        width: 30rem;
        margin: 3rem auto;
        @include skeleton;
      }

      .heading {
        width: 50%;
        height: 3rem;
        margin-top: 4rem;
        margin-bottom: 2rem;
        @include skeleton;
      }
    }
  }
}
</style>
