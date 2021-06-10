import React, { useCallback, useState } from "react";
import PT from "prop-types";
import { toastr } from "react-redux-toastr";
import { navigate } from "@reach/router";
import _ from "lodash";
import AddedRolesAccordion from "../AddedRolesAccordion";
import Completeness from "../Completeness";
import SearchCard from "../SearchCard";
import ResultCard from "../ResultCard";
import NoMatchingProfilesResultCard from "../NoMatchingProfilesResultCard";
import { createJob } from "services/jobs";
import { postProject, searchRoles } from "services/teams";
import { setCurrentStage } from "utils/helpers";
import AddAnotherModal from "../AddAnotherModal";
import "./styles.module.scss";

function SearchContainer({
  stages,
  setStages,
  isCompletenessDisabled,
  children,
  searchObject,
  completenessStyle,
  locationState,
  reloadRolesPage,
}) {
  const [addedRoles, setAddedRoles] = useState(
    locationState.addedRoles ? locationState.addedRoles : []
  );
  const [searchState, setSearchState] = useState(null);
  const [matchingRole, setMatchingRole] = useState(null);
  const [addAnotherModalOpen, setAddAnotherModalOpen] = useState(false);
  const [submitDone, setSubmitDone] = useState(true);
  const [prevSearchId, setPrevSearchId] = useState(locationState.prevSearchId);

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

  const addAnother = () => {
    if (!reloadRolesPage) {
      navigate("/taas/myteams/createnewteam/role", {
        state: { addedRoles, prevSearchId },
      });
      return;
    }
    setCurrentStage(0, stages, setStages);
    setSearchState(null);
    setMatchingRole(null);
    setAddAnotherModalOpen(false);
    reloadRolesPage();
  };

  const search = () => {
    setCurrentStage(1, stages, setStages);
    setSearchState("searching");
    setMatchingRole(null);
    const searchObjectCopy = { ...searchObject };
    if (prevSearchId) {
      searchObjectCopy.previousRoleSearchRequestId = prevSearchId;
    }
    searchRoles(searchObjectCopy)
      .then((res) => {
        const id = _.get(res, "data.id");
        const name = _.get(res, "data.name");
        setPrevSearchId(_.get(res, "data.roleSearchRequestId"));
        if (name && !name.toLowerCase().includes("niche")) {
          setMatchingRole(res.data);
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

  const renderLeftSide = () => {
    if (!searchState) return children;
    if (searchState === "searching") return <SearchCard />;
    if (matchingRole) return <ResultCard role={matchingRole} />;
    return (
      <NoMatchingProfilesResultCard
        prevSearchId={prevSearchId}
        addedRoles={addedRoles}
      />
    );
  };

  const getPercentage = useCallback(() => {
    if (!searchState) return "26";
    if (searchState === "searching") return "52";
    if (matchingRole) return "98";
    return "88";
  }, [searchState, matchingRole]);

  return (
    <div styleName="page">
      {renderLeftSide()}
      <div styleName="right-side">
        <AddedRolesAccordion addedRoles={addedRoles} />
        <Completeness
          isDisabled={
            isCompletenessDisabled ||
            searchState === "searching" ||
            (searchState === "done" && !matchingRole)
          }
          onClick={searchState ? () => setAddAnotherModalOpen(true) : search}
          extraStyleName={completenessStyle}
          buttonLabel={searchState ? "Submit Request" : "Search"}
          stages={stages}
          percentage={getPercentage()}
        />
      </div>
      {searchState === "done" && matchingRole && (
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

SearchContainer.propTypes = {
  stages: PT.array,
  setStages: PT.func,
  isCompletenessDisabled: PT.bool,
  searchObject: PT.object,
  children: PT.node,
  completenessStyle: PT.string,
  locationState: PT.object,
  reloadRolesPage: PT.func,
};

export default SearchContainer;
