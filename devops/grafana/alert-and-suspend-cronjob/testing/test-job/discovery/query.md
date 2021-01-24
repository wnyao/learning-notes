# Failed job (test-job-failure-2)

max(kube_job_failed{job_name=~"test-job-failure-2.+"} != 0) by (job_name, time)

# Failed job (test-job-failure-3)

count(kube_job_failed{namespace="test", job_name=~"test-job-failure-3.+"} != 0) by (job_name)
