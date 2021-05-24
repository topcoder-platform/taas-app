import React, { useState } from "react";
import "./styles.module.scss";
import IconEarthCheck from "../../../../assets/images/icon-earth-check.svg";
import IconMultipleUsers from "../../../../assets/images/icon-multiple-users.svg";
import IconMultipleActionsCheck from "../../../../assets/images/icon-multiple-actions-check-2.svg";
import IconTeamMeetingChat from "../../../../assets/images/icon-team-meeting-chat.svg";
import Curve from "../../../../assets/images/curve.svg";
import Button from "components/Button";

function ResultCard() {
  const [showRates, setShowRates] = useState(false);

  return (
    <div styleName="result-card">
      <div styleName="heading">
        <IconEarthCheck />
        <h3>We have matching profiles</h3>
        <p>
          We have qualified candidates who match 80% or more of your job
          requirements.
        </p>
        <Curve styleName="curve" />
        <IconEarthCheck styleName="transparent-icon" />
      </div>
      <div styleName="button-group">
        <Button
          type={!showRates ? "segment-selected" : "segment"}
          size="small"
          onClick={() => setShowRates(false)}
        >
          Overview
        </Button>
        <Button
          type={showRates ? "segment-selected" : "segment"}
          size="small"
          onClick={() => setShowRates(true)}
        >
          Rate Details
        </Button>
      </div>
      {showRates ? (
        <div styleName="rate-content">
          <div styleName="rate-left-side">
            <div styleName="cost-info">
              <div styleName="rate-type">
                <h6>Full-Time</h6>
                <p>(40h / week)</p>
              </div>
              <div styleName="weekly-rate">
                <h5>$1,800</h5>
                <p>/Week</p>
              </div>
            </div>
            <div styleName="cost-info">
              <div styleName="rate-type">
                <h6>Part-Time</h6>
                <p>(30h / week)</p>
              </div>
              <div styleName="weekly-rate">
                <h5>$1,250</h5>
                <p>/Week</p>
              </div>
            </div>
            <div styleName="cost-info">
              <div styleName="rate-type">
                <h6>Part-Time</h6>
                <p>(20h / week)</p>
              </div>
              <div styleName="weekly-rate">
                <h5>$800</h5>
                <p>/Week</p>
              </div>
            </div>
          </div>
          <div styleName="vertical-line" />
          <div styleName="rate-right-side">
            <div styleName="timeline-info">
              <IconMultipleActionsCheck />
              <div>
                <p>Qualified candidates within</p>
                <h6>24h</h6>
              </div>
            </div>
            <div styleName="timeline-info">
              <IconTeamMeetingChat />
              <div>
                <p>Interviews can start within</p>
                <h6>48h</h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div styleName="content">
            <div>
              <h4>80%</h4>
              <p>Matching rate</p>
            </div>
            <div styleName="vertical-line" />
            <div>
              <IconMultipleUsers styleName="users" />
              <h4>300+</h4>
              <p>Members matched</p>
            </div>
          </div>
          <div styleName="footer">
            <p>
              <span>60%</span> of members are available 20 hours / week (part
              time)
            </p>
            <p>
              <span>20%</span> of members are available 30 hours / week (part
              time)
            </p>
            <p>
              <span>10%</span> of members are available 40 hours / week (full
              time)
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default ResultCard;
