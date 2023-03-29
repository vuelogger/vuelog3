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

const getPostContent = async function (blockId) {
  const blocks = collectPaginatedAPI(notion.blocks.children.list, {
    block_id: blockId,
  });
  return blocks;
};

const filtering = function (category) {
  if (category != "All") {
    return {
      and: [
        {
          property: "category",
          select: {
            equals: category,
          },
        },
        {
          property: "published",
          checkbox: {
            equals: true,
          },
        },
      ],
    };
  } else {
    return {
      property: "published",
      checkbox: {
        equals: true,
      },
    };
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
      page_size: 1,
    });

    if (res.results.length > 0) {
      const blockId = res.results[0].id;
      const page = await notion.pages.retrieve({ page_id: blockId });

      const blocks = await getPostContent(blockId);
      setStartList(blocks);

      return {
        id: page?.id,
        blocks: blocks,
        cover: page?.cover?.file?.url,
        created: page?.created_time,
        updated: page?.last_edited_time,
        category: getProp(page?.properties?.category),
        title: getProp(page?.properties?.title),
        description: getProp(page?.properties?.description),
        tags: getProp(page?.properties?.tags),
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Page 불러오기 실패", error);
    return [];
  }
});
