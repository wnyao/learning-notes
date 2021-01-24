const express = require("express");
const createError = require("http-errors");
const cronjobRouter = express.Router();

const { patchCronjob, getCronjob } = require("../action/cronjob");
const { deleteJob, deleteJobCollection } = require("../action/job");
const { logger } = require("../utilities/logger");

cronjobRouter.use((req, res, next) => {
  const { ruleName, state } = req.body;

  // DETECT TEST NOTIFICATION
  if (ruleName && ruleName === "Test notification") {
    logger.info("Found test notification");
    res.status(200).json({
      message: "Test notification",
    });
    return;
  }

  // suspend on state "alerting"
  if (!state || state !== "alerting") {
    logger.info(`Found notification with state ${state}`);
    res.status(200).json({
      message: `State ${state}`,
    });
    return;
  }

  next();
});

cronjobRouter.route("/suspend").post(async (req, res, next) => {
  try {
    logger.info(
      `[cronjob/suspend] Begin cronjob suspension: ${JSON.stringify(
        req.body,
        null,
        2
      )}`
    );
    const { evalMatches } = req.body || {};
    const { tags } = (evalMatches && evalMatches[0]) || {};
    const { job_name, namespace } = tags || {};

    // validate namespace and job_name
    if (!namespace || !job_name) {
      next(createError.BadRequest(`No namespace or job name found`));
      return;
    }

    // get cronjob name from job name
    const jobNameSplit = job_name.split("-");
    const cronjob = jobNameSplit.slice(0, jobNameSplit.length - 1).join("-");

    // suspend cronjob
    logger.info(`[cronjob/suspend] Suspend cronjob ${cronjob}`);
    const cronjobPatch = await patchCronjob(namespace, cronjob, [
      {
        op: "replace",
        path: "/spec/suspend",
        value: true,
      },
    ]);

    // delete job collection
    logger.info(`[cronjob/suspend] Deleting job in ${namespace} namespace `);
    await deleteJobCollection(namespace);

    logger.info(`[cronjob/suspend] Successfully suspended cronjob ${cronjob}`);
    res.status(cronjobPatch.code || 200).json({
      ...cronjobPatch,
    });
  } catch (e) {
    logger.error("[cronjob/suspend] Error ", e);
    res.status(404).json({
      message: "Fail to suspend cronjob",
    });
  }
});

module.exports = cronjobRouter;
