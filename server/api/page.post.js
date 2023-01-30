import notion from "./utils/notion";

const findPost = async function (number) {
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
};

const getPostContent = async function (blockId) {
  let result = [];
  let res = await notion.blocks.children.list({ block_id: blockId });
  result.push(...res.results);
  while (res.has_more) {
    res = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: res.next_cursor,
    });
    result.push(...res.results);
  }
  result = addChildren(result);
  return result;
};

const addChildren = async function (blocks) {
  for (const b of blocks) {
    if (b.has_children) {
      const { results } = await notion.blocks.children.list({
        block_id: b.id,
      });

      b.children = results;
      await addChildren(b.children);
    }
  }
  return blocks;
};

export default defineEventHandler(async (e) => {
  try {
    const { number } = await readBody(e);
    const blockId = await findPost(number);

    const blocks = await getPostContent(blockId);

    addChildren(blocks);

    return blocks;
  } catch (error) {
    console.error("Page 불러오기 실패", error);
    return [];
  }
});
