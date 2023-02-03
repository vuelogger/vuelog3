import notion from "../utils/notion";

export default defineEventHandler(async (e) => {
  try {
    const { number } = await readBody(e);
    const { results } = await notion.databases.query({
      database_id: process.env.NOTION_DB_ID,
      filter: {
        and: [
          {
            property: "number",
            number: {
              equals: parseInt(number),
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
    return results?.[0]?.id;
  } catch (error) {
    console.error("Page 찾기 실패", error);
    return null;
  }
});
