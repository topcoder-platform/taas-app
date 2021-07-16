/**
 * No Matching Profiles Result Card
 * Card that appears when there are no matching profiles after searching.
 */
import React, { useCallback, useMemo } from "react";
import { Link } from "@reach/router";
import PT from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addSearchedRole } from "../../actions";
import "./styles.module.scss";
import IconEarthX from "../../../../assets/images/icon-earth-x.svg";
import Curve from "../../../../assets/images/curve.svg";
import Button from "components/Button";
import { formatMoney } from "utils/format";

function NoMatchingProfilesResultCard({ role }) {
  const { addedRoles } = useSelector((state) => state.searchedRoles);

  const alreadyAdded = useMemo(() => {
    if (
      addedRoles.find(
        (addedRole) => addedRole.searchId === role.roleSearchRequestId
      )
    ) {
      return true;
    }
    return false;
  }, [addedRoles, role]);

  const dispatch = useDispatch();

  const addRole = useCallback(() => {
    const searchId = role.roleSearchRequestId;
    let name = "Custom Role";
    if (role.jobTitle && role.jobTitle.length) {
      name = role.jobTitle;
    }
    dispatch(addSearchedRole({ searchId, name }));
  }, [dispatch, role]);

  return (
    <div styleName="result-card">
      <div styleName="heading">
        <IconEarthX />
        <h3>Additional Evaluation Needed</h3>
        <Curve styleName="curve" />
        <IconEarthX styleName="transparent-icon" />
      </div>
      <div styleName="content">
        <h4 styleName="job-title">
          {role.jobTitle && role.jobTitle.length
            ? role.jobTitle
            : "Custom Role"}
        </h4>
        <p styleName="info-txt">
          We did not get a perfect match to your requirements on the first pass,
          but we are confident they are out there. We'd like to dig a little
          deeper into our community to find someone who can fit your needs. This
          may take up to two weeks. Please continue to submit your request, and
          a Topcoder representative will reach out to you soon with next steps.
        </p>
        {role.rates && role.name ? (
          <div styleName="niche-rate-box">
            <p>{role.name} Rate</p>
            <p styleName="cost">{formatMoney(role.rates[0].global)}</p>
            <p>/Week</p>
          </div>
        ) : (
          <div styleName="niche-rate-box">
            <p>Custom Rate</p>
            <p styleName="cost">$1,200</p>
            <p>/Week</p>
          </div>
        )}
        <div styleName="button-group">
          <Link to="/taas/createnewteam">
            <Button styleName="left" type="secondary">
              Modify Search Criteria
            </Button>
          </Link>
          <Button
            onClick={addRole}
            disabled={!role.roleSearchRequestId || alreadyAdded}
            type="primary"
          >
            {alreadyAdded ? "Added" : "Add Custom Role"}
          </Button>
        </div>
      </div>
    </div>
  );
}

NoMatchingProfilesResultCard.propTypes = {
  role: PT.object,
};

export default NoMatchingProfilesResultCard;
