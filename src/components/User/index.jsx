import React from "react";
/**
 * User
 *
 * Shows user handle, full name and photo.
 */
import Avatar from "components/Avatar";
import PT from "prop-types";
import "./styles.module.scss";
import { formatFullName } from "utils/format";
import { TOPCODER_COMMUNITY_WEBSITE_URL } from "../../../config";

const User = ({ user, hideFullName = false }) => {
  {
    console.log(user);
  }
  return (
    <div styleName="user">
      <Avatar {...user} />
      <div styleName="user-details">
        <a
          href={
            user.teamId
              ? `/taas/myteams/${user.teamId}/rb/${user.id}`
              : `${TOPCODER_COMMUNITY_WEBSITE_URL}/members/${user.handle}`
          }
        >
          <strong>{user.handle}</strong>
        </a>
        {!hideFullName && (
          <div>{formatFullName(user.firstName, user.lastName)}</div>
        )}
      </div>
    </div>
  );
};

User.propTypes = {
  user: PT.shape({
    photoUrl: PT.string,
    firstName: PT.string,
    lastName: PT.string,
    handle: PT.string,
  }),
  hideFullName: PT.bool,
};

export default User;
