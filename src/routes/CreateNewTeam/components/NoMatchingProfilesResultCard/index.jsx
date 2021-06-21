/**
 * No Matching Profiles Result Card
 * Card that appears when there are no matching profiles after searching.
 */
import React from "react";
import { Link } from "@reach/router";
import PT from "prop-types";
import "./styles.module.scss";
import IconEarthX from "../../../../assets/images/icon-earth-x.svg";
import Curve from "../../../../assets/images/curve.svg";
import Button from "components/Button";
import { formatMoney } from "utils/format";

function NoMatchingProfilesResultCard({ role }) {
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
        {role && (
          <div styleName="niche-rate-box">
            <p>{role.name} Rate</p>
            <p styleName="cost">{formatMoney(role.rates[0].global)}</p>
            <p>/Week</p>
          </div>
        )}
        <Link to="/taas/myteams/createnewteam">
          <Button type="secondary" styleName="button">
            Modify Search Criteria
          </Button>
        </Link>
      </div>
    </div>
  );
}

NoMatchingProfilesResultCard.propTypes = {
  role: PT.object,
};

export default NoMatchingProfilesResultCard;
