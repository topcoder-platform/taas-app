/**
 * Submit Container
 * Container for the submission flow.
 * Requires authentication to complete submission process
 * and contains a series of popups to lead user through the flow.
 */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import PT from "prop-types";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { toastr } from "react-redux-toastr";
import { navigate } from "@reach/router";
import ResultCard from "../ResultCard";
import AddedRolesAccordion from "../AddedRolesAccordion";
import Completeness from "../Completeness";
import AddAnotherModal from "../AddAnotherModal";
import TeamDetailsModal from "../TeamDetailsModal";
import ConfirmationModal from "../ConfirmationModal";
import withAuthentication from "../../../../hoc/withAuthentication";
import "./styles.module.scss";
import { setCurrentStage } from "utils/helpers";
import { clearSearchedRoles } from "../../actions";
import { postTeamRequest } from "services/teams";
import SuccessCard from "../SuccessCard";

function SubmitContainer({
  stages,
  setStages,
  completenessStyle,
  location,
  addedRoles,
}) {
  const matchingRole = location?.state?.matchingRole;

  const [addAnotherOpen, setAddAnotherOpen] = useState(true);
  const [teamDetailsOpen, setTeamDetailsOpen] = useState(false);
  const [teamObject, setTeamObject] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentStage(2, stages, setStages);
    if (!addedRoles || addedRoles.length === 0) {
      navigate("/taas/myteams/createnewteam");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // redirects user if they enter the page URL directly
  // without adding any roles.
  useLayoutEffect(() => {
    if (!addedRoles || addedRoles.length === 0) {
      navigate("/taas/myteams/createnewteam");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openTeamDetails = () => {
    setAddAnotherOpen(false);
    setTeamDetailsOpen(true);
  };

  const addAnother = () => {
    navigate("/taas/myteams/createnewteam");
  };

  const assembleTeam = (formData) => {
    const teamObject = _.pick(formData, ["teamName", "teamDescription"]);

    const positions = [];
    for (let key of Object.keys(formData)) {
      if (key === "teamName" || key === "teamDescription") {
        continue;
      }
      const position = _.pick(
        formData[key],
        "numberOfResources",
        "durationWeeks",
        "startMonth"
      );

      position.roleSearchRequestId = key;
      position.roleName = addedRoles.find((role) => role.searchId === key).name;

      positions.push(position);
    }
    teamObject.positions = positions;

    setTeamDetailsOpen(false);
    setTeamObject(teamObject);
  };

  const requestTeam = useCallback(() => {
    setRequestLoading(true);
    postTeamRequest(teamObject)
      .then((res) => {
        const projectId = _.get(res, ["data", "projectId"]);
        dispatch(clearSearchedRoles());
        navigate(`/taas/myteams/${projectId}`);
      })
      .catch((err) => {
        setRequestLoading(false);
        toastr.error("Error Requesting Team", err.message);
      });
  }, [dispatch, teamObject]);

  return (
    <div styleName="page">
      {matchingRole ? <ResultCard role={matchingRole} /> : <SuccessCard />}
      <div styleName="right-side">
        <AddedRolesAccordion addedRoles={addedRoles} />
        <Completeness
          onClick={() => setAddAnotherOpen(true)}
          extraStyleName={completenessStyle}
          buttonLabel="Submit Request"
          stages={stages}
          percentage="98"
        />
      </div>
      <AddAnotherModal
        open={addAnotherOpen}
        onClose={() => setAddAnotherOpen(false)}
        submitDone={true}
        onContinueClick={openTeamDetails}
        addAnother={addAnother}
      />
      <TeamDetailsModal
        open={teamDetailsOpen}
        onClose={() => setTeamDetailsOpen(false)}
        submitForm={assembleTeam}
        addedRoles={addedRoles}
      />
      <ConfirmationModal
        open={!!teamObject}
        onClose={() => setTeamObject(null)}
        onSubmit={requestTeam}
        isLoading={requestLoading}
      />
    </div>
  );
}

SubmitContainer.propTypes = {
  stages: PT.array,
  setStages: PT.func,
  completenessStyle: PT.string,
  location: PT.object,
  addedRoles: PT.array,
};

export default withAuthentication(SubmitContainer);
