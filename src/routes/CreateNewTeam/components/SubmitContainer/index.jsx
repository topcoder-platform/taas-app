import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import ResultCard from "../ResultCard";
import AddedRolesAccordion from "../AddedRolesAccordion";
import Completeness from "../Completeness";
import AddAnotherModal from "../AddAnotherModal";
import TeamDetailsModal from "../TeamDetailsModal";
import ConfirmationModal from "../ConfirmationModal";
import withAuthentication from "../../../../hoc/withAuthentication";
import NoMatchingProfilesResultCard from "../NoMatchingProfilesResultCard";
import "./styles.module.scss";

function SubmitContainer({
  stages,
  completenessStyle,
  reloadRolesPage,
  navigate,
}) {
  const { addedRoles } = useSelector((state) => state.searchedRoles);

  const [addAnotherOpen, setAddAnotherOpen] = useState(true);
  const [teamDetailsOpen, setTeamDetailsOpen] = useState(false);

  const openTeamDetails = () => {
    setAddAnotherOpen(false);
    setTeamDetailsOpen(true);
  };

  const addAnother = () => {
    if (reloadRolesPage) {
      reloadRolesPage;
    }
    navigate("../");
  };

  return (
    <div styleName="page">
      <NoMatchingProfilesResultCard />
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
