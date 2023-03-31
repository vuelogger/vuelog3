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
  const { number } = await readBody(e);

  const res = await notion.databases.query({
    database_id: process.env.NOTION_POST_TABLE_ID,
    filter: {
      and: [
        {
          property: "number",
          number: {
            equals: number,
          },
        },
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
      ],
    },
  });

  if (res.results.length > 0) {
    const curr = res.results[0];
    const prev = null,
      next = null;
    const blocks = await collectPaginatedAPI(notion.blocks.children.list, {
      block_id: curr.id,
    });
    setStartList(blocks);

    return {
      page: {
        id: curr?.id,
        blocks: blocks,
        cover: curr?.cover?.file?.url,
        created: curr?.created_time,
        updated: curr?.last_edited_time,
        category: getProp(curr?.properties?.category),
        title: getProp(curr?.properties?.title),
        description: getProp(curr?.properties?.description),
        tags: getProp(curr?.properties?.tags),
      },
      prev: prev
        ? {
            title: getProp(prev?.properties?.title),
            cover: prev?.cover?.file?.url,
            category: getProp(prev?.properties?.category),
            number: getProp(prev?.properties?.number),
          }
        : null,
      next: next
        ? {
            title: getProp(next?.properties?.title),
            cover: next?.cover?.file?.url,
            category: getProp(next?.properties?.category),
            number: getProp(next?.properties?.number),
          }
        : null,
    };
  } else {
    return null;
  }
});
