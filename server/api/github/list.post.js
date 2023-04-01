import { Octokit } from "octokit";

export default defineEventHandler(async (e) => {
  const { token, page } = await readBody(e);
  const owner = "vuelogger";
  const repo = "vuelog-comment";

  const octokit = new Octokit({ auth: token });
  try {
    const { data: list } = await octokit.request(
      "GET /repos/{owner}/{repo}/issues/comments",
      {
        owner,
        repo,
        direction: "desc",
        page,
        per_page: 10,
      }
    );
    return list;
  } catch (e) {
    return [];
  }
});
