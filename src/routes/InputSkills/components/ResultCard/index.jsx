import React from "react";
import "./styles.module.scss";
import IconEarthCheck from "../../../../assets/images/icon-earth-check.svg";
import Button from "components/Button";

function ResultCard() {
  return (
    <div styleName="result-card">
      <div styleName="heading">
        <IconEarthCheck />
        <h3>We have matching profiles</h3>
        <p>
          We have qualified candidates who match 80% or more of your job
          requirements.
        </p>
      </div>
      <div styleName="card-body">
        <div styleName="button-group">
          <Button type="segment-selected" size="small">
            Overview
          </Button>
          <Button type="segment" size="small">
            Rate Details
          </Button>
        </div>
        <div styleName="content">
          <div>
            <h4>80%</h4>
            <p>Matching rate</p>
          </div>
          <div>
            <h4>300+</h4>
            <p>Members matched</p>
          </div>
        </div>
        <div>
          <p>60% of members are available 20 hours / week (part time)</p>
          <p>20% of members are available 30 hours / week (part time)</p>
          <p>10% of members are available 40 hours / week (full time)</p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
