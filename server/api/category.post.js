import notion from "./utils/notion";

export default defineEventHandler(async (e) => {
  try {
    const res = await notion.databases.retrieve({
      database_id: process.env.NOTION_DB_ID,
    });

    const result = res.properties.category.select.options.map((v) => ({
      link: v.name.toLowerCase(),
      name: v.name,
    }));
    result.unshift({ link: "", name: "All" });
    return result;
  } catch (error) {
    console.error("Category 불러오기 실패", error);
    return [];
  }
});
