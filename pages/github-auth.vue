<template></template>

<script setup>
const { query } = useRoute();
const config = useRuntimeConfig();
const github = config.public.github;

const url = new URL(github.baseUrl + "/login/oauth/access_token");

url.searchParams.append("client_id", github.clientId);
url.searchParams.append("client_secret", github.clientSecret);
url.searchParams.append("code", query.code);

const { data: auth } = await useFetch(url, {
  method: "post",
  headers: {
    accept: "application/json",
  },
});
onMounted(() => {
  if (auth?.value?.access_token) {
    localStorage.setItem("vuelog-github-token", auth?.value?.access_token);
  } else {
    alert("로그인 실패 다시 시도해주세요");
  }
  window.location.assign("/guestbook");
});
</script>

<style lang="scss" scoped></style>
