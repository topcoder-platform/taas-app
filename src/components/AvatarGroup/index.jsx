/**
 * AvatarGroup
 *
 * Shows limited list of of avatars with +N.
 */
import React from "react";
import PT from "prop-types";
import Avatar from "components/Avatar";
import "./styles.module.scss";

const AvatarGroup = ({ users, limit = 4 }) => {
  const usersToShow = users.slice(0, limit);
  const restUsersCount = users.length - usersToShow.length;

  return (
    <div styleName="avatar-group">
      {usersToShow.map((user, index) => (
        <Avatar key={index} {...user} />
      ))}
      {restUsersCount > 0 && (
        <div styleName="rest-count">+{restUsersCount}</div>
      )}
    </div>
  );
};

AvatarGroup.propTypes = {
  users: PT.arrayOf(
    PT.shape({
      photoUrl: PT.string,
      firstName: PT.string,
      lastName: PT.string,
      handle: PT.string,
    })
  ),
  limit: PT.number,
};

export default AvatarGroup;
