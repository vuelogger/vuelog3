<template>
  <div class="book">
    <Transition name="slide-left">
      <aside v-if="list.length > 0" v-show="sidebarActive">
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
    </Transition>
    <div class="content" v-if="blocks">
      <h1 v-if="title">{{ title }}</h1>
      <Article :blocks="blocks" />
    </div>
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
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useBookStore } from "@/stores/book";
import Article from "@/components/windows/post/Article.vue";

const bookStore = useBookStore();
const { sidebarActive } = storeToRefs(bookStore);
const router = useRouter();
const route = useRoute();

if (!route.params.number) {
  router.push({ path: "/book/vue-notion/0" });
}

const list = ref([]);
const blocks = ref([]);
const currNum = ref(route.params.number || 1);
const title = computed(() => {
  return list.value[currNum.value]?.title;
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
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base/transitions.scss";
@import "@/assets/scss/base/variable.scss";
@import "@/assets/scss/base/mixins.scss";

.book {
  width: 100%;

  aside {
    position: absolute;
    top: $window-header-height;
    left: 0;
    width: 300px;
    height: calc(100% - #{$window-header-height});
    background-color: white;
    box-sizing: border-box;
    z-index: 3;
    overflow-y: auto;
    padding: 2rem 0;
    background-color: #fafafa;
    border-right: 1px solid #eee;

    .item {
      width: 100%;
      text-align: left;
      font-size: 1.4rem;
      padding: 1.4rem 2rem;
      line-height: 1.2;
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
    max-width: 100%;
    margin: 0 auto;
    box-sizing: border-box;
    margin-top: 3rem;

    h1 {
      font-size: 4rem;
      font-weight: bold;
      padding-bottom: 3rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid gray;
      line-height: 1.4;
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
