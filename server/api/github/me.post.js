import { Octokit } from "octokit";

export default defineEventHandler(async (e) => {
  const { token } = await readBody(e);

  const octokit = new Octokit({ auth: token });
  try {
    const { data } = await octokit.request("GET /user");
    return data?.login;
  } catch (e) {
    if (e.status == 401) {
      return false;
    } else {
      return null;
    }
  }
});
