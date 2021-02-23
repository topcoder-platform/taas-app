/**
 * Component containing additional logic for AddModal
 */

import React, { useCallback } from "react";
import _ from "lodash";
import PT from "prop-types";
import AddModal from "../AddModal";
import { hasPermission } from "utils/permissions";
import { PERMISSIONS } from "constants/permissions";

/**
 * Checks if a member to be added is already on the team
 * @param {Object} newMember The new member to be added
 * @param {Object[]} memberList An array of members on the team
 *
 * @returns {boolean} true if member already on team, false otherwise
 */
const checkForMatches = (newMember, memberList) => {
  const label = newMember.label;

  if (newMember.isEmail) {
    const lowered = label.toLowerCase();
    return memberList.find((member) => {
      return member.email === lowered;
    });
  }
  return memberList.find((member) => member.handle === label);
};

const AddModalContainer = ({
  members,
  invitees,
  teamId,
  addOpen,
  setAddOpen,
}) => {
  const validateAdds = useCallback(
    (newMembers) => {
      return _.some(newMembers, (newMember) => {
        return (
          checkForMatches(newMember, members) ||
          checkForMatches(newMember, invitees)
        );
      });
    },
    [members, invitees]
  );

  return (
    <AddModal
      open={addOpen}
      onClose={() => setAddOpen(false)}
      teamId={teamId}
      validateAdds={validateAdds}
      showSuggestions={hasPermission(PERMISSIONS.SEE_MEMBER_SUGGESTIONS)}
    />
  );
};

AddModalContainer.propTypes = {
  teamId: PT.string,
  addOpen: PT.bool,
  setAddOpen: PT.func,
  members: PT.arrayOf(
    PT.shape({
      id: PT.number,
      userId: PT.number,
      role: PT.string,
      createdAt: PT.string,
      updatedAt: PT.string,
      createdBy: PT.number,
      updatedBy: PT.number,
      handle: PT.string,
      photoURL: PT.string,
      workingHourStart: PT.string,
      workingHourEnd: PT.string,
      timeZone: PT.string,
      email: PT.string,
    })
  ),
  invitees: PT.arrayOf(
    PT.shape({
      createdAt: PT.string,
      createdBy: PT.number,
      email: PT.string,
      handle: PT.string,
      id: PT.number,
      projectId: PT.number,
      role: PT.string,
      status: PT.string,
      updatedAt: PT.string,
      updatedBy: PT.number,
      userId: PT.number,
    })
  ),
};

export default AddModalContainer;
