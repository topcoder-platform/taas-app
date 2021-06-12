import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
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
import { replaceSearchedRoles } from "../../actions";

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

function SubmitContainer({
  stages,
  setStages,
  completenessStyle,
  reloadRolesPage,
  navigate,
  location,
}) {
  const matchingRole = location?.state?.matchingRole;

  const { addedRoles } = useSelector((state) => state.searchedRoles);

  const [addAnotherOpen, setAddAnotherOpen] = useState(true);
  const [teamDetailsOpen, setTeamDetailsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setCurrentStage(2, stages, setStages);
    const storedRoles = retrieveRoles();
    if (storedRoles) {
      if (!addedRoles || storedRoles.length > addedRoles.length) {
        dispatch(replaceSearchedRoles(storedRoles));
      }
    }
  }, [addedRoles, dispatch, setStages, stages]);

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
      <TeamDetailsModal open={teamDetailsOpen} setOpen={setTeamDetailsOpen} />
      <ConfirmationModal />
    </div>
  );
}

SubmitContainer.propTypes = {};

export default withAuthentication(SubmitContainer);
