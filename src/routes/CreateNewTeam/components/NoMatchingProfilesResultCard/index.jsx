/**
 * No Matching Profiles Result Card
 * Card that appears when there are no matching profiles after searching.
 */
import React from "react";
import PT from "prop-types";
import { navigate } from "@reach/router";
import {
  formatMoney,
} from "utils/format";
import "./styles.module.scss";
import IconEarthX from "../../../../assets/images/icon-earth-x.svg";
import Curve from "../../../../assets/images/curve.svg";
import Button from "components/Button";

function NoMatchingProfilesResultCard({rates = [{global: 0}], onSearch}) {
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
          <p styleName="cost">{formatMoney(rates[0].global)}</p>
          <p>/Week</p>
        </div>
        <Button
          onClick={onSearch}
          type="secondary"
          styleName="button"
        >
          Modify Search Criteria
        </Button>
      </div>
    </div>
  );
}

NoMatchingProfilesResultCard.propTypes = {
  onSearch: PT.func,
  rates: PT.array,
};

export default NoMatchingProfilesResultCard;
