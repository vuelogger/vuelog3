import { notion, getProp } from "./utils/notion";

export default defineEventHandler(async ({ req, res }) => {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end();
    return;
  }

  const routes = [];

  let startCursor;
  while (startCursor !== null) {
    const res = await notion.databases.query({
      database_id: process.env.NOTION_POST_TABLE_ID,
      start_cursor: startCursor,
    });
    if (res.has_more) {
      startCursor = res.next_cursor;
    }

    for (const r of res.results) {
      routes.push({
        url: "/post/" + r.id,
        lastmod: r.last_edited_time,
      });
    }
    break;
  }

  const r = await notion.databases.retrieve({
    database_id: process.env.NOTION_POST_TABLE_ID,
  });

  for (const { name } of r?.properties?.category?.select?.options) {
    routes.push("/post/" + name.toLowerCase());
  }

  return routes;
});
