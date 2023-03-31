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
  try {
    const { number } = await readBody(e);

    const res = await notion.databases.query({
      database_id: process.env.NOTION_POST_TABLE_ID,
      filter: {
        and: [
          {
            property: "number",
            number: {
              greater_than_or_equal_to: number - 1,
            },
          },
          {
            property: "number",
            number: {
              less_than_or_equal_to: number + 1,
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

    let prev = null;
    let curr = null;
    let next = null;
    for (const r of res.results) {
      const n = r.properties.number.number;
      if (n < number) {
        prev = r;
      } else if (n > number) {
        next = r;
      } else {
        curr = r;
      }
    }

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
  } catch (error) {
    console.error("Page 불러오기 실패", error);
    return [];
  }
});
