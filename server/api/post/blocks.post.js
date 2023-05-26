import { notion, getProp } from "../utils/notion";
import { collectPaginatedAPI } from "@notionhq/client";

const setStartList = function (blocks) {
  // numbering
  let start = 0;
  for (const b of blocks) {
    if (b.type === "numbered_list_item") {
      start += 1;
      b.start = start;
    } else {
      start = 0;
    }
  }
};

export default defineEventHandler(async (e) => {
  const { blockId } = await readBody(e);

  const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
    block_id: blockId,
  });
  setStartList(blocks);

  return blocks;
});
