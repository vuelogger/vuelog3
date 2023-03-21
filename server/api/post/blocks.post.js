import { notion } from "../utils/notion";
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

const getPostContent = async function (blockId) {
  const blocks = collectPaginatedAPI(notion.blocks.children.list, {
    block_id: blockId,
  });
  return blocks;
};

export default defineEventHandler(async (e) => {
  try {
    const { blockId } = await readBody(e);

    const blocks = await getPostContent(blockId);
    setStartList(blocks);

    return blocks;
  } catch (error) {
    return [];
  }
});
