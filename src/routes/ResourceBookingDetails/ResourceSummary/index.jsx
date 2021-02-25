/**
 * ResourceSummary
 *
 * Shows resource resource like: handle, avatar.
 */
import React from "react";
import PT from "prop-types";
import User from "components/User";
import "./styles.module.scss";

const ResourceSummary = ({ member }) => {
  return (
    <div styleName="resource-summary">
      <div styleName="resource-summary-wrapper">
        <User
          user={{
            ...member,
            photoUrl: member.photo_url,
          }}
        />
      </div>
    </div>
  );
};

ResourceSummary.propTypes = {
  member: PT.shape({
    firstName: PT.string,
    handle: PT.string,
    id: PT.string,
    lastName: PT.string,
    photo_url: PT.string,
  }),
};

export default ResourceSummary;
