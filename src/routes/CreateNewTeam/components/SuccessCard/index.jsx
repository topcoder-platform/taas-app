/**
 * Success Card
 * Card to show after returning from login in submit
 * new team request flow. Shows success state, but does
 * not require receiving props
 */
import React from "react";
import PT from "prop-types";
import { Link } from "@reach/router";
import IconEarthCheck from "../../../../assets/images/icon-earth-check.svg";
import Curve from "../../../../assets/images/curve.svg";
import "./styles.module.scss";
import Button from "components/Button";

function SuccessCard({skillsMatch}) {
  return (
    <div styleName="result-card">
      <div styleName="heading">
        <IconEarthCheck />
        <h3>We have matching profiles</h3>
        <p>
          We have qualified candidates who match {skillsMatch}% or more of
          your job requirements.
        </p>
        <Curve styleName="curve" />
        <IconEarthCheck styleName="transparent-icon" />
      </div>
      <div styleName="content">
        <p styleName="info-txt">
          Please use the button to the right to submit your request, or the
          button below to search for additional roles.
        </p>
        <Link to="/taas/myteams/createnewteam" state={{ keepAddedRoles: true }}>
          <Button type="secondary" styleName="button">
            Continue Search
          </Button>
        </Link>
      </div>
    </div>
  );
}

SuccessCard.propTypes = {
  skillsMatch: PT.number,
};
export default SuccessCard;
