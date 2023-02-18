import { TwitterApi } from "twitter-api-v2";

export default (function () {
  const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET_KEY,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET_TOKEN,
  });
  const client = twitterClient.readOnly;

  return {
    async getUserData() {
      const user = await client.currentUser();

      return {
        name: user.name,
        id: user.screen_name,
        description: user.description,
        followers: user.followers_count,
        followings: user.friends_count,
        favorites: user.favourites_count,
        profile: user.profile_image_url,
        banner: user.profile_banner_url,
      };
    },
  };
})();
