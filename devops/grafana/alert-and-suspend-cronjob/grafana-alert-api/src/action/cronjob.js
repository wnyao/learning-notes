const fetch = require("node-fetch");
const { getOptions } = require("../utilities/utilities");
const { logger } = require("../utilities/logger");
const { KUBERNETES_CLUSTER_URL } = process.env;

const getCronjob = async (namespace, name) => {
  const url = `${KUBERNETES_CLUSTER_URL}/apis/batch/v1beta1/namespaces/${namespace}/cronjobs/${name}`;

  try {
    const response = await fetch(url, getOptions("GET"));
    const json = await response.json();

    if (response.status !== 200) {
      throw JSON.stringify(json, null, 2);
    }

    return json;
  } catch (e) {
    logger.error(`[getCronjob] Failed to get cronJob ${name}`);
    logger.error(`[getCronjob] Error ${e}`);
  }
};

const patchCronjob = async (namespace, name, spec) => {
  const url = `${KUBERNETES_CLUSTER_URL}/apis/batch/v1beta1/namespaces/${namespace}/cronjobs/${name}`;
  const options = getOptions("PATCH", spec, {
    // "content-type": "application/strategic-merge-patch+json",
    // "content-type": "application/merge-patch+json",
    "content-type": "application/json-patch+json",
  });

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (response.status !== 200) {
      throw JSON.stringify(json, null, 2);
    }

    return json;
  } catch (e) {
    logger.error(`[patchCronjob] Failed to patch cronJob ${name}`);
    logger.error(`[patchCronjob] Error ${e}`);
  }
};

module.exports = {
  getCronjob,
  patchCronjob,
};
