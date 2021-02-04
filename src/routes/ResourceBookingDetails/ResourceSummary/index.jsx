/**
 * ResourceSummary
 *
 * Shows resource resource like: handle, avatar.
 */
import React from "react";
import PT from "prop-types";
import User from "components/User";
import "./styles.module.scss";

const ResourceSummary = ({ candidate }) => {
  return (
    <div styleName="resource-summary">
      <div styleName="resource-summary-wrapper">
        <User
          user={{
            ...candidate,
            photoUrl: candidate.photo_url,
          }}
        />
      </div>
    </div>
  );
};

ResourceSummary.propTypes = {
  candidate: PT.shape({
    firstName: PT.string,
    handle: PT.string,
    id: PT.string,
    lastName: PT.string,
    photo_url: PT.string,
  }),
};

export default ResourceSummary;
