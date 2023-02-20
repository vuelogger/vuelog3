import { notion, getProp } from "./utils/notion";

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
    const { category, startCursor } = await readBody(e);
    const res = await notion.databases.query({
      database_id: process.env.NOTION_POST_TABLE_ID,
      filter: filtering(category),
      // page_size: 19,
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
    });
    return {
      list: res.results.map((v) => ({
        id: v.id,
        created: v.created_time,
        updated: v.last_edited_time,
        cover: v.cover?.file?.url,
        category: getProp(v.properties.category),
        description: getProp(v.properties.description),
        tags: getProp(v.properties.tags),
        title: getProp(v.properties.title),
      })),
      nextCursor: res.next_cursor,
    };
  } catch (error) {
    console.error("Table 불러오기 실패", error);
    return [];
  }
});
