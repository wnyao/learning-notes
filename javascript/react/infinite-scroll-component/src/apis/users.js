const { REACT_APP_GITHUB_API_V3_URL } = process.env;

export const getUserAPI = async (username) => {
  const url = `${REACT_APP_GITHUB_API_V3_URL}/users/${username}`;

  try {
    const response = await fetch(url, {
      Accept: "application/vnd.github.v3+json",
    });

    if (!response) throw response;
    return await response.json();
  } catch (e) {
    console.error("[ getUserAPI ]: ", e);
    return {};
  }
};
