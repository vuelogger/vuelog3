<script setup>
import Content from "./post/NotionContent.vue";
import List from "./post/NotionList.vue";
import SideMenu from "./post/SideMenu.vue";

const { params } = useRoute();

const isPost = ref(params.id != undefined);
const list = ref([]);
const post = ref(null);
const category = ref([]);

const changePost = function (number) {
  isPost.value = true;
  useFetch("/api/page", { method: "post", body: { number } }).then(
    ({ data }) => {
      post.value = data.value;
      console.log(post.value);
    }
  );
};

const changeCategory = function (category) {
  isPost.value = false;
  useFetch("/api/table", {
    method: "post",
    body: { category },
  }).then(({ data }) => {
    list.value = data.value.list;
  });
};

onMounted(async () => {
  const { data } = await useFetch("/api/category", { method: "post" });
  category.value = data.value;
  if (isPost.value) {
    changePost(params.id);
  } else {
    for (const c of category.value) {
      if (c.link == params.category) {
        changeCategory(c.name);
      }
    }
  }
});
</script>

<template>
  <div class="post">
    <Content v-if="isPost" :post="post" />
    <List v-else :list="list" @change-post="changePost" />
    <SideMenu :category="category" @change-category="changeCategory" />
  </div>
</template>
