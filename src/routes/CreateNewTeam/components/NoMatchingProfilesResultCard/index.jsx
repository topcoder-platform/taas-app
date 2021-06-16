/**
 * No Matching Profiles Result Card
 * Card that appears when there are no matching profiles after searching.
 */
import React from "react";
import { Link } from "@reach/router";
import "./styles.module.scss";
import IconEarthX from "../../../../assets/images/icon-earth-x.svg";
import Curve from "../../../../assets/images/curve.svg";
import Button from "components/Button";

function NoMatchingProfilesResultCard() {
  return (
    <div styleName="result-card">
      <div styleName="heading">
        <IconEarthX />
        <h3>No Matching Profiles</h3>
        <Curve styleName="curve" />
        <IconEarthX styleName="transparent-icon" />
      </div>
      <div styleName="content">
        <p styleName="info-txt">
          We will be looking internally for members matching your requirements
          and be back at them in about 2 weeks.
        </p>
        <div styleName="niche-rate-box">
          <p>Niche Rate</p>
          <p styleName="cost">$1,200</p>
          <p>/Week</p>
        </div>
        <Link to="/taas/myteams/createnewteam">
          <Button type="secondary" styleName="button">
            Modify Search Criteria
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NoMatchingProfilesResultCard;
