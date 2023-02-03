<script setup>
import Content from "./post/NotionContent.vue";
import List from "./post/NotionList.vue";
import SideBar from "./post/SideBar.vue";

const { params } = useRoute();

const isPost = ref(params.id != undefined);
const list = ref([]);
const blocks = ref(null);
const category = ref([]);

const changePost = function (number) {
  blocks.value = null;
  isPost.value = true;
  useFetch("/api/page/find", { method: "post", body: { number } }).then(
    (res) => {
      useFetch("/api/page", {
        method: "post",
        body: { blockId: res.data.value },
      }).then(({ data }) => {
        blocks.value = data.value;
      });
    }
  );
};

const changeList = function (category) {
  list.value = null;
  isPost.value = false;
  useFetch("/api/table", {
    method: "post",
    body: { category },
  }).then(({ data }) => {
    list.value = data.value.list;
  });
};

if (isPost.value) {
  useFetch("/api/category", { method: "post" }).then(({ data }) => {
    category.value = data.value;
  });
  changePost(params.id);
} else {
  const { data } = await useFetch("/api/category", { method: "post" });
  category.value = data.value;

  for (const c of category.value) {
    if (c.link == params.category) {
      changeList(c.name);
    } else if (c.link == "") {
      changeList("All");
    }
  }
}
</script>

<template>
  <div class="post">
    <SideBar :category="category" @change-list="changeList" />
    <Content v-if="isPost" :blocks="blocks" />
    <List v-else :list="list" @change-post="changePost" />
  </div>
</template>

<style lang="scss"></style>
