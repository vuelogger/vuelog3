import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
export default defineEventHandler((event) => {
  console.log(notion);
  return {
    api: "works",
  };
});
