import { notion, getProp } from "../utils/notion";

export default defineEventHandler(async (e) => {
  try {
    const { blockId } = await readBody(e);

    const page = await notion.pages.retrieve({ page_id: blockId });

    return {
      cover: page?.cover?.file?.url,
      created: page?.created_time,
      updated: page?.last_edited_time,
      category: getProp(page?.properties?.category),
      title: getProp(page?.properties?.title),
      description: getProp(page?.properties?.description),
      tags: getProp(page?.properties?.tags),
    };
  } catch (error) {
    console.error("Page 불러오기 실패", error);
    return [];
  }
});
