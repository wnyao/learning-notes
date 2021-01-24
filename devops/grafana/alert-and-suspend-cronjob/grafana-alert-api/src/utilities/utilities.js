const fs = require("fs");
const https = require("https");

const {
  KUBERNETES_SERVICE_ACCOUNT_TOKEN_PATH,
  KUBERNETES_SERVICE_ACCOUNT_CA_CERT_PATH,
  KUBERNETES_CLUSTER_URL,
} = process.env;

const getOptions = (method = "GET", body, options) => {
  const isHTTPS = KUBERNETES_CLUSTER_URL.includes("https");

  return {
    method,
    body: body && JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      Authorization: !KUBERNETES_SERVICE_ACCOUNT_TOKEN_PATH ? "" : getToken(),
      ...options,
    },
    agent: !isHTTPS
      ? null
      : new https.Agent({
          ca: fs.readFileSync(KUBERNETES_SERVICE_ACCOUNT_CA_CERT_PATH, "utf8"),
          rejectUnauthorized: false,
        }),
  };
};

const getToken = () => {
  if (!KUBERNETES_SERVICE_ACCOUNT_TOKEN_PATH) return;
  const content = fs.readFileSync(
    KUBERNETES_SERVICE_ACCOUNT_TOKEN_PATH,
    "utf8"
  );
  return content && `Bearer ${content}`;
};

module.exports = {
  getOptions,
};
