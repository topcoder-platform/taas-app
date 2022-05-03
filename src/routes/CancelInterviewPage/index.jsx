/**
 * Cancel Interview Page
 *
 * Allows users to cancel an interview
 */
import React, { useEffect, useState } from "react";
import { toastr } from "react-redux-toastr";
import Page from "components/Page";
import moment from "moment";
import axios from "axios";
import PageHeader from "components/PageHeader";
import Button from "components/Button";
import Input from "components/Input";
import LoadingIndicator from "components/LoadingIndicator";
import { getAuthUserProfile } from "@topcoder/mfe-header";
import { getJobById } from "services/jobs";
import { getInterview, cancelInterview } from "services/interviews";
import { INTERVIEW_STATUS } from "constants";
import withAuthentication from "../../hoc/withAuthentication";
import "./styles.module.scss";

const CancelInterviewPage = ({ interviewId }) => {
  const [interview, setInterview] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [reason, setReason] = useState("");

  const onCancelInterview = () => {
    setCancelling(true);
    cancelInterview(
      interview.nylasPageSlug,
      interview.nylasEventEditHash,
      reason
    )
      .then(({ s }) => {
        setCancelled(true);
        setCancelling(false);
      })
      .catch((err) => {
        setCancelling(false);
        toastr.error("Error cancel interview", err.message);
      });
  };

  useEffect(() => {
    getAuthUserProfile()
      .then((res) => {
        return {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
        };
      })
      .then((profile) => {
        getInterview(interviewId)
          .then(({ data }) => {
            if (
              data.status === INTERVIEW_STATUS.SCHEDULED ||
              data.status === INTERVIEW_STATUS.RESCHEDULED
            ) {
              setInterview(data);

              return axios
                .get(`https://schedule.nylas.com/${data.nylasPageSlug}`)
                .then(({ data: nylasHtml }) => {
                  // extract json object from html file
                  const nylasconfig = JSON.parse(
                    nylasHtml.match(
                      /window.nylasWindowContext.page = (.*);<\/script>/
                    )[1]
                  );
                  setJobTitle(nylasconfig.name);
                });
            } else {
              setErrorMessage(
                `This interview has status ${data.status} and cannot be cancelled.`
              );
            }
          })
          .catch((err) => {
            setErrorMessage(err);
          });
      });
  }, [interviewId]);

  return (
    <>
      <Page title="Cancel Interview">
        {!interview || !jobTitle ? (
          <LoadingIndicator error={errorMessage} />
        ) : (
          <>
            <PageHeader title="Cancel Interview" />
            <div>
              <div styleName="top-bar">
                <h1>{jobTitle}</h1>
              </div>
              <div styleName="shadowed-content">
                <div styleName="slot-cancelview">
                  <div styleName="left-panel">
                    <div styleName="booking-summary">
                      <h2>
                        {moment(interview.startTimestamp).format("dddd")} <br />{" "}
                        {moment(interview.startTimestamp).format(
                          "MMMM DD, yyyy"
                        )}
                      </h2>
                      <h4>
                        {moment(interview.startTimestamp).format("H:mm A")} -{" "}
                        {moment(interview.endTimestamp).format("H:mm A")}
                      </h4>
                      <p>{interview.guestTimezone}</p>
                    </div>
                  </div>
                  <div styleName="divider"></div>
                  <div styleName="right-panel">
                    {cancelled ? (
                      <form styleName="cancelled-form">
                        <div styleName="tick-mark"></div>
                        <h3>Thank you</h3>
                        <div>your booking has been cancelled</div>
                      </form>
                    ) : (
                      <form>
                        <h3>Are you sure?</h3>
                        <div>
                          <div styleName="label">Reason for canceling *</div>
                          <div>
                            <Input
                              placeholder="Please add a brief reason"
                              onChange={(e) => {
                                setReason(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <Button
                          onClick={onCancelInterview}
                          size="medium"
                          type="primary"
                          disabled={!reason.length || cancelling}
                        >
                          {cancelling ? "Cancelling Event" : "Cancel Event"}
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Page>
    </>
  );
};

export default withAuthentication(CancelInterviewPage);
