/**
 * Lists team members and invitees
 */

import React, { useState } from "react";
import PT from "prop-types";
import CardHeader from "components/CardHeader";
import Button from "components/Button";
import "./styles.module.scss";
import User from "components/User";
import TimeSection from "../TimeSection";
import { formatInviteTime } from "utils/format";
import DeleteModal from "../DeleteModal";
import AddModalContainer from "../AddModalContainer";

const MemberList = ({ teamId, members, invitees }) => {
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const openDeleteModal = (member) => {
    setSelectedToDelete(member);
    setDeleteOpen(true);
  };

  return (
    <>
      <div styleName="member-list">
        <div styleName="list-header">
          <CardHeader title="Project Access" />
          <div styleName="actions">
            <Button onClick={() => setAddOpen(true)}>+Add</Button>
          </div>
        </div>
        {members.length > 0 || invitees.length > 0 ? (
          <div styleName="table">
            {members.map((member) => (
              <div styleName="row-container">
                <div styleName="table-row">
                  <div styleName="table-group avatar-name">
                    <div styleName="table-cell">
                      <User
                        user={{
                          ...member,
                          photoUrl: member.photoURL,
                        }}
                        hideFullName
                      />
                    </div>
                  </div>
                  <TimeSection
                    start={member.workingHourStart}
                    end={member.workingHourEnd}
                    timeZone={member.timeZone}
                  />
                  <button
                    onClick={() => openDeleteModal(member)}
                    styleName="delete"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
            {invitees.map((invitee) => (
              <div styleName="row-container">
                <div styleName="table-row">
                  <div styleName="table-group avatar-name">
                    <div styleName="table-cell">
                      <User
                        user={{
                          ...invitee,
                          photoUrl: invitee.photoURL,
                          handle: invitee.handle || invitee.email,
                        }}
                        showArrow
                        hideFullName
                      />
                    </div>
                  </div>
                  <div styleName="table-group invite-date">
                    <div styleName="table-cell">
                      Invited {formatInviteTime(invitee.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>no members on team</p>
        )}
      </div>
      <DeleteModal
        selected={selectedToDelete}
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        teamId={teamId}
      />
      <AddModalContainer
        members={members}
        invitees={invitees}
        teamId={teamId}
        addOpen={addOpen}
        setAddOpen={setAddOpen}
      />
    </>
  );
};

MemberList.propTypes = {
  teamId: PT.string,
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

export default MemberList;
