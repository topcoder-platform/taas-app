/* eslint-disable react-hooks/rules-of-hooks */
/**
 * JobForm
 *
 * Page for job create or edit.
 * It gets `teamId` and `jobId` from the router.
 */
import React, { useState, useEffect } from "react";
import PT from "prop-types";
import { toastr } from "react-redux-toastr";
import moment from "moment";
import _ from "lodash";
import store from "../../store";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import { useData } from "hooks/useData";
import { getJobById, createJob, updateJob, getEmptyJob } from "services/jobs";
import { getSkills } from "services/skills";
import LoadingIndicator from "components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import TCForm from "../../components/TCForm";
import { getEditJobConfig, getCreateJobConfig } from "./utils";

import "./styles.module.scss";

const JobForm = ({ teamId, jobId }) => {
  const isEdit = !!jobId;
  const [options, setOptions] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [skills, loadingError] = useData(getSkills);
  const [job] = isEdit
    ? useData(getJobById, jobId)
    : useData(getEmptyJob, teamId);
  const title = isEdit ? "Edit Job Details" : "Create Job";

  const onSubmit = async (values) => {
    if (values.startDate) {
      values.startDate = moment(values.startDate).format("YYYY-MM-DD");
    }
    if (isEdit) {
      await updateJob(values, jobId).then(
        () => {
          toastr.success("Job updated successfully.");
          setSubmitting(false);
          window.history.pushState({}, null, `/taas/myteams/${teamId}`);
        },
        (err) => {
          toastr.error(err.message);
          setSubmitting(false);
        }
      );
    } else {
      const createValues = {
        ...values,
        projectId: teamId,
      };
      await createJob(createValues).then(
        () => {
          toastr.success("Job created successfully.");
          setSubmitting(false);
          window.history.pushState({}, null, `/taas/myteams/${teamId}`);
        },
        (err) => {
          toastr.error(err.message);
          setSubmitting(false);
        }
      );
    }
  };

  useEffect(() => {
    if (skills && job && !options) {
      const skillOptions = skills.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      });
      setOptions(skillOptions);
    }
  }, [skills, job, options]);

  return (
    <Page title={title}>
      {!job || !skills || !options ? (
        <LoadingIndicator error={loadingError} />
      ) : (
        <>
          <PageHeader
            title={title}
            backTo={
              isEdit
                ? `/taas/myteams/${teamId}/positions/${jobId}`
                : `/taas/myteams/${teamId}`
            }
          />
          <div styleName="job-modification-details">
            <TCForm
              configuration={getEditJobConfig(
                options,
                job.isApplicationPageActive,
                isEdit
                  ? job.status === "assigned" ||
                      job.status === "closed" ||
                      job.status === "cancelled"
                  : false,
                onSubmit
              )}
              initialValue={job}
              submitButton={{ text: isEdit ? "Save" : "Create" }}
              backButton={{
                text: "Cancel",
                backTo: isEdit
                  ? `/taas/myteams/${teamId}/positions/${jobId}`
                  : `/taas/myteams/${teamId}`,
              }}
              submitting={submitting}
              setSubmitting={setSubmitting}
            />
          </div>
        </>
      )}
    </Page>
  );
};

JobForm.propTypes = {
  teamId: PT.string,
  jobId: PT.string,
};

export default withAuthentication(JobForm);
