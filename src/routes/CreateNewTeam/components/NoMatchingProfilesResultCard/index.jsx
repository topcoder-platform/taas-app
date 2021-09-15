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
import IconPerson from "../../../../assets/images/icon-person.svg";
import Curve from "../../../../assets/images/curve.svg";
import Button from "components/Button";
import { formatMoney } from "utils/format";

function NoMatchingProfilesResultCard({ role, onSubmit }) {
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
    dispatch(
      addSearchedRole({
        searchId,
        name,
        rates: role.rates,
        imageUrl: role.imageUrl,
      })
    );
    onSubmit()
  }, [dispatch, role]);

  return (
    <div styleName="result-card">
      <div styleName="heading">
        <IconPerson />
        <h3>locating available custom talent</h3>
        <Curve styleName="curve" />
      </div>
      <div styleName="content">
        <h4 styleName="job-title">
          What happens next
        </h4>
        <p styleName="info-txt">
          We routinely place great people with the skills you’ve asked for. Right now, we don’t have anyone available. However, our database is dynamic and updated often. Please continue below so we can finalize your talent request and alert you when a great candidate becomes available. 
        </p>
        <div styleName="button-group">
          <Link to="/taas/createnewteam">
            <Button styleName="left" type="secondary">
              Modify Search
            </Button>
          </Link>
          <Button
            onClick={addRole}
            disabled={!role.roleSearchRequestId}
            type="primary"
          >
            Request talent
          </Button>
        </div>
      </div>
    </div>
  );
}

NoMatchingProfilesResultCard.propTypes = {
  role: PT.object,
  onSubmit: PT.func,
};

export default NoMatchingProfilesResultCard;
