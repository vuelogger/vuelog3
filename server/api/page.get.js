import { getPageBlocks } from "vue3-notion";

export default defineEventHandler(async () => {
  // TODO: env로 옮기기
  return await getPageBlocks("06604ac5e06846e29ac229734c1d7809");
});
