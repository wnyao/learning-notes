## cluster events

When a job is created from cronjob:

Cluster Events:

    - SuccessfulCreate (job)
    - scheduled (job)
    - pulling (pod)
    - pulled (pod)
    - created (pod)
    - started (pod)
    - backOff (pod)
    - BackoffLimitExceeded (job)
    - SuccessfulDelete (pod)
    - SawCompletedJob (job) : Saw completed job: [job name] status: Failed
    - SuccessfulDelete (job)

Job Events:

    - SuccessfulCreate
    - SuccessfulDelete
    - BackoffLimitExceeded

