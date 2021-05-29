/**
 * Result Card
 * Card that appears after searching for
 * users matching given skills. Gives information
 * about costs and number of matching candidates.
 */
import React, { useState, useEffect } from "react";
import cn from "classnames";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import "./styles.module.scss";
import IconEarthCheck from "../../../../assets/images/icon-earth-check.svg";
import IconMultipleUsers from "../../../../assets/images/icon-multiple-users.svg";
import IconMultipleActionsCheck from "../../../../assets/images/icon-multiple-actions-check-2.svg";
import IconTeamMeetingChat from "../../../../assets/images/icon-team-meeting-chat.svg";
import Curve from "../../../../assets/images/curve.svg";
import CircularProgressBar from "../CircularProgressBar";
import Button from "components/Button";

function ResultCard() {
  const [userHandle, setUserHandle] = useState("handle");
  const [showSpecialRates, setShowSpecialRates] = useState(false);
  const [showRates, setShowRates] = useState(false);

  useEffect(() => {
    getAuthUserProfile().then((res) => {
      setUserHandle(res.handle || "handle");
    });
  }, []);

  return (
    <div styleName="result-card">
      <div
        role="button"
        tabIndex="0"
        onClick={() => setShowSpecialRates(!showSpecialRates)}
        styleName={cn("heading", { ["non-clickable"]: !showRates })}
      >
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
      {showRates && showSpecialRates && (
        <div styleName="xeno-rates">
          <p styleName="greeting-txt">
            Hi {userHandle}, we have special rates for you as a Xeno User!
          </p>
          <div styleName="rates">
            <div styleName="rate-info">
              <div styleName="rate-heading">
                <h4>Full-Time</h4>
                <p>(40h / week)</p>
              </div>
              <div styleName="senior">
                <h4>Senior Member</h4>
                <div styleName="cost">
                  <h4>$2,000</h4>
                  <p>/Week</p>
                </div>
              </div>
              <div styleName="standard">
                <h4>Standard Member</h4>
                <div styleName="cost">
                  <h4>$1,500</h4>
                  <p>/Week</p>
                </div>
              </div>
              <div styleName="junior">
                <h4>Junior Member</h4>
                <div styleName="cost">
                  <h4>$1,000</h4>
                  <p>/Week</p>
                </div>
              </div>
            </div>
            <div styleName="rate-info">
              <div styleName="rate-heading">
                <h4>Part-Time</h4>
                <p>(30h / week)</p>
              </div>
              <div styleName="senior">
                <h4>Senior Member</h4>
                <div styleName="cost">
                  <h4>$1,800</h4>
                  <p>/Week</p>
                </div>
              </div>
              <div styleName="standard">
                <h4>Standard Member</h4>
                <div styleName="cost">
                  <h4>$1,300</h4>
                  <p>/Week</p>
                </div>
              </div>
              <div styleName="junior">
                <h4>Junior Member</h4>
                <div styleName="cost">
                  <h4>$800</h4>
                  <p>/Week</p>
                </div>
              </div>
            </div>
            <div styleName="rate-info">
              <div styleName="rate-heading">
                <h4>Part-Time</h4>
                <p>(20h / week)</p>
              </div>
              <div styleName="senior">
                <h4>Senior Member</h4>
                <div styleName="cost">
                  <h4>$1,600</h4>
                  <p>/Week</p>
                </div>
              </div>
              <div styleName="standard">
                <h4>Standard Member</h4>
                <div styleName="cost">
                  <h4>$1,100</h4>
                  <p>/Week</p>
                </div>
              </div>
              <div styleName="junior">
                <h4>Junior Member</h4>
                <div styleName="cost">
                  <h4>$600</h4>
                  <p>/Week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showRates && !showSpecialRates && (
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
      )}
      {!showRates && (
        <div styleName="content">
          <div styleName="matching-info">
            <div>
              <CircularProgressBar
                size="160"
                progress="80"
                strokeWidth="6"
                children={
                  <div styleName="progressbar-child">
                    <h4>80%</h4>
                    <p>Matching rate</p>
                  </div>
                }
              />
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
        </div>
      )}
    </div>
  );
}

export default ResultCard;
