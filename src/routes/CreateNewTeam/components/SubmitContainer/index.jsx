/**
 * Submit Container
 * Container for the submission flow.
 * Requires authentication to complete submission process
 * and contains a series of popups to lead user through the flow.
 */
import React, {
  useCallback,
  useEffect,
  useMemo,
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
import Progress from "../Progress";
import AddAnotherModal from "../AddAnotherModal";
import TeamDetailsModal from "../TeamDetailsModal";
import ConfirmationModal from "../ConfirmationModal";
import { withBusinessAuthentication } from "../../../../hoc/withAuthentication";
import "./styles.module.scss";
import { isCustomRole, isUuid, setCurrentStage } from "utils/helpers";
import {
  addTeamObjects,
  clearSearchedRoles,
  editRoleAction,
} from "../../actions";
import { postTeamRequest } from "services/teams";
import NoMatchingProfilesResultCard from "../NoMatchingProfilesResultCard";

function SubmitContainer({
  matchedSkills,
  unMatchedSkills,
  stages,
  setStages,
  progressStyle,
  matchingRole,
  previousSearchId,
  addedRoles,
}) {
  const [addAnotherOpen, setAddAnotherOpen] = useState(false);
  const [teamDetailsOpen, setTeamDetailsOpen] = useState(true);
  const [teamObject, setTeamObject] = useState(null);
  const [requestLoading, setRequestLoading] = useState(false);
  const [buttonClickable, setButtonClickable] = useState(true);

  const dispatch = useDispatch();

  const currentRole = useMemo(() => {
    return _.find(addedRoles, { searchId: previousSearchId });
  }, [addedRoles, previousSearchId]);

  const onSaveEditRole = useCallback(
    (isValid, role) => {
      setButtonClickable(isValid);
      if (isValid) {
        dispatch(editRoleAction({ ...role, searchId: previousSearchId }));
      }
    },
    [dispatch, previousSearchId]
  );
  useEffect(() => {
    setCurrentStage(2, stages, setStages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // redirects user if they enter the page URL directly
  // without adding any roles or delete all roles.
  useLayoutEffect(() => {
    if (!addedRoles || addedRoles.length === 0) {
      navigate("/taas/createnewteam");
    }
  }, [addedRoles]);

  const openTeamDetails = () => {
    setAddAnotherOpen(false);
    setTeamDetailsOpen(true);
  };

  const addAnother = () => {
    navigate("/taas/createnewteam");
  };

  const assembleTeam = (formData) => {
    const teamObject = _.pick(formData, [
      "teamName",
      "teamDescription",
      "refCode",
    ]);

    const positions = [];
    for (let key of Object.keys(formData)) {
      if (!isUuid(key)) {
        continue;
      }
      const position = _.mapValues(formData[key], (val, key) =>
        key === "startMonth" ? val : parseInt(val, 10)
      );

      if (position.startMonth === null) {
        delete position.startMonth;
      }

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
    if (matchingRole.isExternalMember) {
      dispatch(addTeamObjects(teamObject));
      navigate("/taas/myteams/createnewteam/create-taas-payment");
    } else {
      postTeamRequest(teamObject)
        .then(() => {
          setTimeout(() => {
            dispatch(clearSearchedRoles());
            // Backend api create project has sync issue, so delay 2 seconds
            navigate("/taas/myteams");
          }, 2000);
        })
        .catch((err) => {
          setRequestLoading(false);
          toastr.error("Error Requesting Team", err.message);
        });
    }
  }, [dispatch, teamObject]);

  return (
    <div styleName="page">
      {!isCustomRole(matchingRole) ? (
        <ResultCard
          matchedSkills={matchedSkills}
          unMatchedSkills={unMatchedSkills}
          role={matchingRole}
          onSaveEditRole={onSaveEditRole}
          currentRole={currentRole}
        />
      ) : (
        <NoMatchingProfilesResultCard role={matchingRole} />
      )}
      <div styleName="right-side">
        <AddedRolesAccordion addedRoles={addedRoles} />
        <Progress
          onClick={() => setAddAnotherOpen(true)}
          extraStyleName={progressStyle}
          isDisabled={!buttonClickable}
          buttonLabel="Continue"
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
      {teamDetailsOpen && (
        <TeamDetailsModal
          open={teamDetailsOpen}
          onClose={() => setTeamDetailsOpen(false)}
          submitForm={assembleTeam}
          addedRoles={addedRoles}
        />
      )}
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
  matchedSkills: PT.array,
  unMatchedSkills: PT.array,
  stages: PT.array,
  setStages: PT.func,
  progressStyle: PT.string,
  addedRoles: PT.array,
  previousSearchId: PT.string,
  matchingRole: PT.object,
};

export default withBusinessAuthentication(SubmitContainer);
