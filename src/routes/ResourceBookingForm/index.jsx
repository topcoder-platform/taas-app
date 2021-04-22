/**
 * ResourceBookingEdit
 *
 * Page for edit resource booking details.
 * It gets `teamId` and `resourceBookingId` from the router.
 */
import React, { useState, useMemo } from "react";
import PT from "prop-types";
import _ from "lodash";
import { toastr } from "react-redux-toastr";
import Page from "../../components/Page";
import PageHeader from "../../components/PageHeader";
import { useData } from "hooks/useData";
import {
  getReourceBookingById,
  updateReourceBooking,
} from "services/resourceBookings";
import { getTeamById } from "services/teams";
import LoadingIndicator from "../../components/LoadingIndicator";
import withAuthentication from "../../hoc/withAuthentication";
import TCForm from "../../components/TCForm";
import { getEditResourceBookingConfig } from "./utils";
import "./styles.module.scss";
import moment from "moment";

const ResourceBookingDetails = ({ teamId, resourceBookingId }) => {
  const [submitting, setSubmitting] = useState(false);
  const [team, loadingTeamError] = useData(getTeamById, teamId);
  const [rb, loadingError] = useData(getReourceBookingById, resourceBookingId);

  const formData = useMemo(() => {
    if (team && rb) {
      const resource = _.find(team.resources, { id: resourceBookingId });

      const data = {
        ...rb,
        // resource inside Team object has all the member details we need
        // so we can get user handle from there
        handle: resource.handle,
      };

      if (resource.jobId) {
        const job = _.find(team.jobs, { id: resource.jobId });
        data.jobTitle = _.get(job, "title", `<Not Found> ${resource.jobId}`);
      } else {
        data.jobTitle = "<Not Assigned>";
      }

      return data;
    }
  }, [rb, team, resourceBookingId]);

  const onSubmit = async (values) => {
    const data = getRequestData(values);
    await updateReourceBooking(data, resourceBookingId).then(
      () => {
        toastr.success("Resource Booking updated successfully.");
        setSubmitting(false);
        window.history.pushState({}, null, `/taas/myteams/${teamId}`);
      },
      (err) => {
        setSubmitting(false);
        toastr.error(err.message);
      }
    );
  };

  // as we are using `PUT` method (not `PATCH`) we have send ALL the fields
  // fields which we don't send would become `null` otherwise
  const getRequestData = (values) => {
    const data = _.pick(values, [
      "projectId",
      "userId",
      "jobId",
      "status",
      "startDate",
      "endDate",
      "memberRate",
      "customerRate",
      "rateType",
    ]);

    // convert dates to the API format before sending
    if (data.startDate) {
      data.startDate = moment(data.startDate).format('YYYY-MM-DD')
    }
    if (data.endDate) {
      data.endDate = moment(data.endDate).format('YYYY-MM-DD')
    }

    return data
  }

  return (
    <Page title="Edit Resource Booking">
      {!formData ? (
        <LoadingIndicator error={loadingError || loadingTeamError} />
      ) : (
        <>
          <PageHeader
            title="Edit Resource Booking"
            backTo={`/taas/myteams/${teamId}/rb/${resourceBookingId}`}
          />
          <div styleName="rb-modification-details">
            <TCForm
              configuration={getEditResourceBookingConfig(onSubmit)}
              initialValue={formData}
              submitButton={{ text: "Save" }}
              backButton={{ text: "Cancel", backTo: `/taas/myteams/${teamId}` }}
              submitting={submitting}
              setSubmitting={setSubmitting}
            />
          </div>
        </>
      )}
    </Page>
  );
};

ResourceBookingDetails.propTypes = {
  teamId: PT.string,
  resourceBookingId: PT.string,
};

export default withAuthentication(ResourceBookingDetails);
