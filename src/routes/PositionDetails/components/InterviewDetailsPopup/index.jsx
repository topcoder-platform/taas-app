import React, { useEffect, useState } from "react";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import { Form } from "react-final-form";
import Radio from "components/Radio";
import User from "components/User";
import BaseModal from "components/BaseModal";
import FormField from "components/FormField";
import Button from "components/Button";
import { FORM_FIELD_TYPE } from "constants";
import "./styles.module.scss";

function InterviewDetailsPopup({ open, onClose, candidate }) {
  const [isLoading, setIsLoading] = useState(true);
  const [myEmail, setMyEmail] = useState("");

  useEffect(() => {
    getAuthUserProfile().then((res) => {
      setMyEmail(res.email || "");
      setIsLoading(false);
    });
  }, []);

  return isLoading ? null : (
    <Form
      initialValues={{
        myemail: myEmail,
      }}
      onSubmit={(values) => console.log(values)}
    >
      {(props) => (
        <BaseModal
          open={open}
          onClose={onClose}
          title="Schedule an Interview"
          button={
            <Button
              onClick={props.handleSubmit}
              size="medium"
              isSubmit
              disabled={false}
            >
              Begin scheduling
            </Button>
          }
        >
          <div>
            <div styleName="top">
              <div styleName="user">
                {candidate === null ? (
                  ""
                ) : (
                  <User
                    user={{
                      ...candidate,
                      photoUrl: candidate.photo_url,
                    }}
                    hideFullName
                  />
                )}
              </div>
              <div>
                <Radio
                  label="30 Minute Interview"
                  type="radio"
                  name="radio"
                  value={30}
                  checked={true}
                  horizontal={true}
                />
                <Radio
                  label="60 Minute Interview"
                  type="radio"
                  name="radio"
                  value={60}
                  horizontal={true}
                />
              </div>
            </div>
            <div styleName="center">
              <h4 styleName="center-header">Attendees:</h4>
              <p styleName="modal-text">
                Please provide email addresses for all parties you would like
                involved with the interview.
              </p>
              <FormField
                field={{
                  name: "myemail",
                  type: FORM_FIELD_TYPE.TEXT,
                  placeholder: "Email Address",
                  label: "Email Address",
                  maxLength: 320,
                }}
              />
              <FormField
                field={{
                  name: "email2",
                  type: FORM_FIELD_TYPE.TEXT,
                  placeholder: "Email Address",
                  label: "Email Address",
                  maxLength: 320,
                }}
              />
            </div>
            <div styleName="bottom">
              <p styleName="modal-text">
                Selecting “Begin Scheduling” will initiate emails to all
                attendees to coordinate availabiltiy. Please check your email to
                input your availability.
              </p>
            </div>
          </div>
        </BaseModal>
      )}
    </Form>
  );
}

export default InterviewDetailsPopup;
