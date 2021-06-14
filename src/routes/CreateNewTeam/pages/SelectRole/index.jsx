/**
 * Select Role Page
 *
 * Gets project id from the router.
 *
 * Allows selecting a role, searching for users
 * with that role, and submitting a job requiring the roles.
 */
import React, { useCallback, useEffect, useState } from "react";
import { useData } from "hooks/useData";
import { navigate } from "@reach/router";
import { toastr } from "react-redux-toastr";
import PT from "prop-types";
import RolesList from "./components/RolesList";
import Completeness from "../../components/Completeness";
import "./styles.module.scss";
import { getRoles } from "services/roles";
import { setCurrentStage } from "utils/helpers";
import LoadingIndicator from "components/LoadingIndicator";
import SearchCard from "../../components/SearchCard";
import ResultCard from "../../components/ResultCard";
import NoMatchingProfilesResultCard from "../../components/NoMatchingProfilesResultCard";
import { createJob } from "services/jobs";
import AddAnotherModal from "../../components/AddAnotherModal";
import RoleDetailsModal from "../../components/RoleDetailsModal";
import withAuthentication from "../../../../hoc/withAuthentication";
import AddedRolesAccordion from "./components/AddedRolesAccordion";

function SelectRole({ projectId }) {
  const [stages, setStages] = useState([
    { name: "Select a Role", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
  const [addedRoles, setAddedRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [searchState, setSearchState] = useState(null);
  const [matchingProfiles, setMatchingProfiles] = useState(null);
  const [addAnotherModalOpen, setAddAnotherModalOpen] = useState(false);
  const [roleDetailsModalOpen, setRoleDetailsModalOpen] = useState(false);
  const [roleDetailsModalId, setRoleDetailsModalId] = useState(null);
  const [submitDone, setSubmitDone] = useState(true);

  const [roles, loadingError] = useData(getRoles);

  let searchTimer;

  const submitJob = () => {
    setSubmitDone(false);
    createJob({
      projectId,
      title: `job-${Date()}`,
      skills: [],
      roleIds: addedRoles.map((r) => r.id),
      numPositions: 1,
    })
      .then(() => {
        toastr.success("Job Submitted");
      })
      .catch((err) => {
        console.error(err);
        toastr.warning("Error Submitting Job");
      })
      .finally(() => {
        setSubmitDone(true);
        navigate("/taas/myteams");
      });
  };

  const addAnother = useCallback(() => {
    setSelectedRoleId(null);
    setCurrentStage(0, stages, setStages);
    setAddAnotherModalOpen(false);
    setSearchState(null);
  }, [stages]);

  const toggleRole = useCallback(
    (id) => {
      setSelectedRoleId((selectedRoleId) =>
        id === selectedRoleId ? null : id
      );
    },
    [setSelectedRoleId]
  );

  const onDescriptionClick = useCallback((roleId) => {
    setRoleDetailsModalId(roleId);
    setRoleDetailsModalOpen(true);
  }, []);

  // mocked search for users with given roles
  const search = () => {
    setCurrentStage(1, stages, setStages);
    setSearchState("searching");
    searchTimer = setTimeout(() => {
      setCurrentStage(2, stages, setStages);
      setMatchingProfiles(null); // display no matching profiles screen for a while
      setSearchState("done");
      setTimeout(() => setMatchingProfiles(true), 2000);
      // add selected role
      const { id, name } = roles.find((r) => r.id === selectedRoleId);
      setAddedRoles((addedRoles) => [...addedRoles, { id, name }]);
    }, 3000);
  };

  useEffect(() => clearTimeout(searchTimer));

  if (!roles) {
    return <LoadingIndicator error={loadingError} />;
  }

  if (roles && !searchState) {
    return (
      <div styleName="page">
        <RolesList
          roles={roles}
          selectedRoleId={selectedRoleId}
          toggleRole={toggleRole}
          onDescriptionClick={onDescriptionClick}
        />
        <div styleName="right-side">
          {addedRoles.length > 0 && (
            <AddedRolesAccordion addedRoles={addedRoles} />
          )}
          <Completeness
            isDisabled={!selectedRoleId}
            onClick={search}
            extraStyleName="role-selection"
            buttonLabel="Search"
            stages={stages}
            percentage="26"
          />
          <RoleDetailsModal
            roleId={roleDetailsModalId}
            open={roleDetailsModalOpen}
            onClose={() => setRoleDetailsModalOpen(false)}
          />
        </div>
      </div>
    );
  }

  if (searchState === "searching") {
    return (
      <div styleName="page">
        <SearchCard />
        <Completeness
          extraStyleName="role-selection"
          isDisabled
          buttonLabel="Submit Request"
          stages={stages}
          percentage="52"
        />
      </div>
    );
  }

  if (searchState === "done") {
    return (
      <div styleName="page">
        {matchingProfiles ? <ResultCard /> : <NoMatchingProfilesResultCard />}
        <div styleName="right-side">
          {matchingProfiles && <AddedRolesAccordion addedRoles={addedRoles} />}
          <Completeness
            extraStyleName="role-selection"
            buttonLabel="Submit Request"
            stages={stages}
            percentage={matchingProfiles ? 98 : 88}
            isDisabled={!matchingProfiles}
            onClick={() => setAddAnotherModalOpen(true)}
          />
        </div>
        {matchingProfiles && (
          <AddAnotherModal
            open={addAnotherModalOpen}
            onClose={() => setAddAnotherModalOpen(false)}
            submitDone={submitDone}
            onContinueClick={submitJob}
            addAnother={addAnother}
          />
        )}
      </div>
    );
  }
}

SelectRole.propTypes = {
  projectId: PT.string,
};

export default withAuthentication(SelectRole);
