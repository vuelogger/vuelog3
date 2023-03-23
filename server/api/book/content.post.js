import { notion, getProp } from "../utils/notion";
import { collectPaginatedAPI } from "@notionhq/client";

export default defineEventHandler(async (e) => {
  try {
    const { id } = await readBody(e);
    const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: id,
    });

    return blocks;
  } catch (error) {
    console.error("Book content 불러오기 실패", error);
    return [];
  }
});
