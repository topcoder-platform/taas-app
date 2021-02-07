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
import { Link } from "@reach/router";

const User = ({ user, hideFullName = false, handleLinkTo }) => {
  return (
    <div styleName="user">
      <Avatar {...user} />
      <div styleName="user-details">
        {/* if "handleLinkTo" is provided, use it as internal link, otherwise as external profile link */}
        {handleLinkTo ? (
          <Link to={handleLinkTo}>
            <strong>{user.handle}</strong>
          </Link>
        ) : (
          <a
            href={`${TOPCODER_COMMUNITY_WEBSITE_URL}/members/${user.handle}`}
            target="_blank"
          >
            <strong>{user.handle}</strong>
          </a>
        )}

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
  handleLinkTo: PT.string,
};

export default User;
