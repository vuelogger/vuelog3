import { notion, getProp } from "./utils/notion";
export default defineEventHandler(async (e) => {
  try {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_MUSIC_TABLE_ID,
    });
    return res.results.map((v) => ({
      title: getProp(v?.properties?.title),
      src: getProp(v?.properties?.src),
    }));
  } catch (error) {
    console.error("Musics 불러오기 실패", error);
    return [];
  }
});
