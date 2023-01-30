<script setup>
import SideBar from "@/components/window/post/Sidebar.vue";
import Content from "@/components/window/post/NotionContent.vue";
import List from "./post/NotionList.vue";

const { params } = useRoute();
let isPost = ref(params.id != undefined);

let list = ref([]);
let post = ref(null);

const { data } = await useFetch("/api/category", { method: "post" });
const category = data.value;

const changePost = function (number) {
  isPost.value = true;
  useFetch("/api/page", { method: "post", body: { number } }).then(
    ({ data }) => {
      post.value = data.value;
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

if (isPost.value) {
  changePost(params.id);
} else {
  for (const c of category) {
    if (c.link == params.category) {
      changeCategory(c.name);
    }
  }
}
</script>

<template>
  <div class="post">
    <Content v-if="isPost" :post="post" />
    <List v-else :list="list" @change-post="changePost" />
    <SideBar :category="category" @change-category="changeCategory" />
  </div>
</template>
