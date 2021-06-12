import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
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
import NoMatchingProfilesResultCard from "../NoMatchingProfilesResultCard";
import "./styles.module.scss";
import { setCurrentStage } from "utils/helpers";
import { clearSearchedRoles, replaceSearchedRoles } from "../../actions";
import { postTeamRequest } from "services/teams";

const retrieveRoles = () => {
  const searchIdString = sessionStorage.getItem("searchIds");
  const nameString = sessionStorage.getItem("roleNames");

  if (!searchIdString || !nameString) return [];
  const searchIds = searchIdString.split(",");
  const names = nameString.split(",");
  if (searchIds.length !== names.length) return [];

  const roles = [];
  for (let i = 0; i < searchIds.length; i++) {
    roles.push({
      searchId: searchIds[i],
      name: names[i],
    });
  }

  return roles;
};

const clearSessionKeys = () => {
  sessionStorage.removeItem("searchIds");
  sessionStorage.removeItem("roleNames");
};

function SubmitContainer({
  stages,
  setStages,
  completenessStyle,
  reloadRolesPage,
  location,
}) {
  const matchingRole = location?.state?.matchingRole;

  const { addedRoles } = useSelector((state) => state.searchedRoles);

  const [addAnotherOpen, setAddAnotherOpen] = useState(true);
  const [teamDetailsOpen, setTeamDetailsOpen] = useState(false);
  const [teamObject, setTeamObject] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentStage(2, stages, setStages);
    const storedRoles = retrieveRoles();
    if (storedRoles) {
      if (!addedRoles || storedRoles.length > addedRoles.length) {
        dispatch(replaceSearchedRoles(storedRoles));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openTeamDetails = () => {
    setAddAnotherOpen(false);
    setTeamDetailsOpen(true);
  };

  const addAnother = () => {
    if (reloadRolesPage) {
      setCurrentStage(0, stages, setStages);
      reloadRolesPage();
    }
    navigate("/taas/myteams/createnewteam/role");
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
        clearSessionKeys();
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
      {matchingRole ? (
        <ResultCard role={matchingRole} />
      ) : (
        <NoMatchingProfilesResultCard />
      )}
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

SubmitContainer.propTypes = {};

export default withAuthentication(SubmitContainer);
