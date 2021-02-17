/**
 * Lists team members and invitees
 */

import React, { useState } from "react";
import _ from 'lodash';
import PT from "prop-types";
import CardHeader from "components/CardHeader";
import Button from "components/Button";
import "./styles.module.scss";
import Avatar from "components/Avatar";
import { Link } from "@reach/router";

import TimeSection from "../TimeSection";
import { formatInviteTime } from "utils/format";
import IconDirectArrow from "../../../../assets/images/icon-direct-arrow.svg";
import AddModal from "../AddModal";
import DeleteModal from "../DeleteModal";

function MemberList({ teamId, members, invitees }) {
  const [selectedToDelete, setSelectedToDelete] = useState(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [isInvite, setIsInvite] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  const validateInvites = (newInvites) => {
    return _.some(newInvites, newInvite => {
      (members.find(member => newInvite.label === member.handle) || invitees.find(invite => newInvite.label === invite.handle))
    })
  }

  const openDeleteModal = (member, isInvite = false) => {
    setIsInvite(isInvite);
    setSelectedToDelete(member);
    setDeleteOpen(true);
  };

  return (
    <>
      <div styleName="member-list">
        <div styleName="list-header">
          <CardHeader title="Project Access" />
          <div styleName="actions">
            <Button onClick={() => setInviteOpen(true)}>+Add</Button>
          </div>
        </div>
        {members.length > 0 || invitees.length > 0 ? (
          <div styleName="table">
            {members.map((member) => (
              <div styleName="row-container">
                <div styleName="table-row">
                  <div styleName="table-group avatar-name">
                    <div styleName="table-cell">
                      <Avatar
                        photoUrl={member.photoURL}
                        handle={member.handle || member.email}
                      />
                    </div>
                    <div styleName="table-cell">
                      <Link to={`/taas/myteams/${teamId}/rb/${member.id}`}>
                        {member.handle || member.email}
                      </Link>
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
                      <div styleName="invite-avatar">
                        <Avatar
                          photoUrl={invitee.photoURL}
                          handle={invitee.handle || invitee.email}
                        />
                        <IconDirectArrow styleName="direct-arrow" />
                      </div>
                    </div>
                    <div styleName="table-cell">
                      <Link to={`/taas/myteams/${teamId}/rb/${invitee.id}`}>
                        {invitee.handle || invitee.email}
                      </Link>
                    </div>
                  </div>
                  <div styleName="table-group invite-date">
                    <div styleName="table-cell">
                      Invited {formatInviteTime(invitee.createdAt)}
                    </div>
                  </div>
                  <button
                    onClick={() => openDeleteModal(invitee, true)}
                    styleName="delete"
                  >
                    &times;
                  </button>
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
        isInvite={isInvite}
      />
      <AddModal open={inviteOpen} onClose={() => setInviteOpen(false)} teamId={teamId} validateInvites={validateInvites} />
    </>
  );
}

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
