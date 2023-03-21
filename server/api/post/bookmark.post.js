import ogs from "open-graph-scraper";

export default defineEventHandler(async (e) => {
  const { url } = await readBody(e);

  const { result } = await ogs({ url });

  return result;
});
