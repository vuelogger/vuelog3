import notion from "./utils/notion";

const getProp = function (prop) {
  const t = prop.type;
  switch (t) {
    case "select":
      return prop[t].name;
    case "rich_text":
    case "title":
      return prop[t][0].plain_text;
    case "created_time":
    case "last_edited_time":
    case "number":
    case "checkbox":
      return prop[t];
    case "multi_select":
      return prop[t].map((v) => v.name);
  }
};

export default defineEventHandler(async (e) => {
  try {
    const { category, startCursor } = await readBody(e);
    const res = await notion.databases.query({
      database_id: process.env.NOTION_DB_ID,
      filter: {
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
      },
      sorts: [
        {
          timestamp: "created_time",
          direction: "descending",
        },
      ],
      page_size: 10,
    });
    return {
      list: res.results.map((v) => ({
        created: v.created_time,
        updated: v.last_edited_time,
        cover: v.cover?.file?.url,
        category: getProp(v.properties.category),
        description: getProp(v.properties.description),
        number: getProp(v.properties.number),
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
