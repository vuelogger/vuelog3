import getMetaData from "metadata-scraper";

export default defineEventHandler(async (e) => {
  const { url } = await readBody(e);

  return await getMetaData(url);
});
