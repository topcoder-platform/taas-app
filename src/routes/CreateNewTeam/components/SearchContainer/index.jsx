/**
 * SearchContainer
 *
 * A container component for the different
 * search pages. Contains logic and supporting
 * components for searching for roles.
 */
import React, { useCallback, useState, useMemo, useEffect } from "react";
import PT from "prop-types";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { editRoleAction } from "../../actions";
import AddedRolesAccordion from "../AddedRolesAccordion";
import Progress from "../Progress";
import SearchCard from "../SearchCard";
import ResultCard from "../ResultCard";
import NoMatchingProfilesResultCard from "../NoMatchingProfilesResultCard";
import { isCustomRole } from "utils/helpers";
import AddAnotherModal from "../AddAnotherModal";
import "./styles.module.scss";

function SearchContainer({
  isNewRole,
  stages,
  progressStyle,
  navigate,
  addedRoles,
  searchState,
  previousSearchId,
  matchingRole,
}) {
  const [addAnotherOpen, setAddAnotherOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [buttonClickable, setButtonClickable] = useState(true);

  const dispatch = useDispatch();
  const currentRole = useMemo(() => {
    return _.find(addedRoles, { searchId: previousSearchId });
  }, [addedRoles, previousSearchId]);

  useEffect(() => {
    if (isNewRole) {
      setShowEditModal(true);
    }
  }, [isNewRole]);

  const onSaveEditRole = useCallback(
    (isValid, role) => {
      setButtonClickable(isValid)
      if (isValid) {
        dispatch(editRoleAction({ ...role, searchId: previousSearchId }));
      }
    },
    [addedRoles, previousSearchId]
  );

  const onSubmit = useCallback(() => {
    setAddAnotherOpen(false);
    navigate("../result");
  }, [navigate]);

  const addAnother = useCallback(() => {
    navigate("/taas/createnewteam");
  }, [navigate]);

  const renderLeftSide = () => {
    if (searchState === "searching") return <SearchCard />;
    if (!isCustomRole(matchingRole))
      return (
        <ResultCard
          role={matchingRole}
          onSaveEditRole={onSaveEditRole}
          currentRole={currentRole}
        />
      );
    return <NoMatchingProfilesResultCard role={matchingRole} />;
  };

  const getPercentage = useCallback(() => {
    if (searchState === "searching") return "52";
    if (matchingRole) return "98";
    return "88";
  }, [searchState, matchingRole]);

  return (
    <div styleName="page">
      {renderLeftSide()}
      <div styleName="right-side">
        <AddedRolesAccordion addedRoles={addedRoles} />
        <Progress
          isDisabled={
            !buttonClickable ||
            searchState === "searching" ||
            (searchState === "done" && (!addedRoles || !addedRoles.length))
          }
          onClick={() => setAddAnotherOpen(true)}
          extraStyleName={progressStyle}
          buttonLabel="Continue"
          stages={stages}
          percentage={getPercentage()}
        />
      </div>
      <AddAnotherModal
        open={addAnotherOpen}
        onClose={() => setAddAnotherOpen(false)}
        submitDone={true}
        onContinueClick={onSubmit}
        addAnother={addAnother}
      />
    </div>
  );
}

SearchContainer.propTypes = {
  isNewRole: PT.bool,
  stages: PT.array,
  progressStyle: PT.string,
  previousSearchId: PT.string,
  navigate: PT.func,
  addedRoles: PT.array,
  searchState: PT.string,
  matchingRole: PT.object,
};

export default SearchContainer;
