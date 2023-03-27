import Twitter from "./utils/twitter";

export default defineEventHandler(async (e) => {
  try {
    return await Twitter.getUserData();
  } catch (error) {
    console.error("Twitter 불러오기 실패", error);
    return [];
  }
});
