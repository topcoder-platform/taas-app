/**
 * Select Role Page
 *
 * Gets project id from the router.
 *
 * Allows selecting a role, searching for users
 * with that role, and submitting a job requiring the roles.
 */
import React, { useCallback, useState } from "react";
import { useData } from "hooks/useData";
import { navigate } from "@reach/router";
import { toastr } from "react-redux-toastr";
import _ from "lodash";
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
import { postProject, searchRoles } from "services/teams";

function SelectRole() {
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

  const submitJob = () => {
    setSubmitDone(false);
    postProject()
      .then((res) => {
        const projectId = _.get(res, "data.id");

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
          });
      })
      .catch((err) => {
        console.error(err);
        toastr.warning("Error Creating Project");
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

  const search = () => {
    setCurrentStage(1, stages, setStages);
    setSearchState("searching");
    setMatchingProfiles(null);
    searchRoles({ roleId: selectedRoleId })
      .then((res) => {
        const id = _.get(res, "data.id");
        const name = _.get(res, "data.name");
        const prevSearchId = _.get(res, "data.roleSearchRequestId");
        if (name && !name.toLowerCase().includes("niche")) {
          setMatchingProfiles(res.data);
          setAddedRoles((addedRoles) => [...addedRoles, { id, name }]);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCurrentStage(2, stages, setStages);
        setSearchState("done");
      });
  };

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
        {matchingProfiles ? (
          <ResultCard role={matchingProfiles} />
        ) : (
          <NoMatchingProfilesResultCard />
        )}
        <div styleName="right-side">
          {addedRoles.length && <AddedRolesAccordion addedRoles={addedRoles} />}
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

export default SelectRole;
