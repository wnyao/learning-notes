const { REACT_APP_GITHUB_API_V3_URL } = process.env;

export const listUserReposAPI = async (username, pageNumber, perPage = 10) => {
  const url = `${REACT_APP_GITHUB_API_V3_URL}/users/${username}/repos?page=${pageNumber}&per_page=${perPage};`;

  try {
    const response = await fetch(url, {
      Accept: "application/vnd.github.v3+json",
    });

    if (!response) throw response;
    return await response.json();
  } catch (e) {
    console.error("[ ListUserReposAPI ]: ", e);
    return [];
  }
};
