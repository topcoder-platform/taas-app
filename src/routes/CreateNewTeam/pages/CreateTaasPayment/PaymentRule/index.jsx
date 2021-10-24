import React, { useState } from "react";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { navigate } from "@reach/router";
import _ from "lodash";
import { toastr } from "react-redux-toastr";
import { postTeamRequest } from "services/teams";
import Button from "components/Button";
import Checkbox from "components/Checkbox";
import Spinner from "components/CenteredSpinner";
import { clearSearchedRoles } from "../../../actions";

import "./styles.module.scss";

const PaymentRule = ({ calculatedAmount }) => {
  const [processing, setProcessing] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [clicked, setClicked] = useState(true);
  const [projectId, setProjectId] = useState(null);
  const dispatch = useDispatch();
  const { teamObject } = useSelector((state) => state.searchedRoles);

  const handlePostTeam = async (e) => {
    setProcessing(true);
    postTeamRequest(teamObject)
      .then((res) => {
        const projectId = _.get(res, "data.projectId");
        dispatch(clearSearchedRoles());
        navigate(`/taas/myteams/${projectId}`);
      })
      .catch((err) => {
        toastr.error("Error Requesting Team", err.message);
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <div styleName="commitment-container">
      <div styleName="commitment-title">Our commitment to you</div>
      <div styleName="commitment-content">
        We will do everything we can to find the talent you need within the
        Topcoder Community.
      </div>
      <div styleName="commitment-title">Your commitment to us</div>
      <div styleName="commitment-content">
        You will only post genuine job opportunities, and will be responsive and
        communicative with the candidates provided. You recognize the
        freelancers in the Topcoder Community are real people making big
        decisions based on your engagement with them.
      </div>
      <div>
        <Checkbox
          label="I agree to the above commitments."
          checked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
        />
      </div>
      <Button
        size="medium"
        disabled={!isChecked || processing}
        styleName={cn({ processing })}
        size="medium"
        type="primary"
        onClick={handlePostTeam}
      >
        {processing ? (
          <>
            <div styleName="spinner">
              <Spinner stype="Oval" width="16" height="16" />
            </div>
            Confirm
          </>
        ) : (
          <>Confirm</>
        )}
      </Button>
    </div>
  );
};

export default PaymentRule;
