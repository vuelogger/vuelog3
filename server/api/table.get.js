import { getPageTable } from "vue3-notion";

export default defineEventHandler(async () => {
  // TODO: env로 옮기기
  return await getPageTable("9055e282b44f4b62aeee4a81b8eeb187");
});

// fetch a page's content, including all async blocks, collection queries, and signed urls
