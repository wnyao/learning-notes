const fetch = require("node-fetch");
const { getOptions } = require("../utilities/utilities");
const { KUBERNETES_CLUSTER_URL } = process.env;
const { logger } = require("../utilities/logger");

const deleteJob = async (namespace, name) => {
  try {
    const url = `${KUBERNETES_CLUSTER_URL}/apis/batch/v1/namespaces/${namespace}/jobs/${name}`;
    const response = await fetch(url, getOptions("DELETE"));
    const json = await response.json();

    if (response.status !== 200) {
      throw JSON.stringify(json, null, 2);
    }

    return json;
  } catch (e) {
    logger.error(`[deleteJob] Failed to delete job ${name}`);
    logger.error(`[deleteJob] Error ${e}`);
  }
};

const deleteJobCollection = async (namespace) => {
  try {
    const url = `${KUBERNETES_CLUSTER_URL}/apis/batch/v1/namespaces/${namespace}/jobs`;
    const response = await fetch(url, getOptions("DELETE"));
    const json = await response.json();

    if (response.status !== 200) {
      throw JSON.stringify(json, null, 2);
    }

    return json;
  } catch (e) {
    logger.error(
      `[deleteJobCollection] Failed to delete job collection in namespace ${namespace}`
    );
    logger.error(`[deleteJobCollection] Error ${e}`);
  }
};

module.exports = {
  deleteJob,
  deleteJobCollection,
};
