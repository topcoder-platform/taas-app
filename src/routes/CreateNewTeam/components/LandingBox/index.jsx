/**
 * Landing Box
 * An option for the Create New Team
 * landing page
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";
import Button from "components/Button";

function LandingBox({
  showGap,
  icon,
  title,
  description,
  onClick,
  isDisabled,
  backgroundImage,
}) {
  return (
    <div
      styleName="landing-box"
      style={{
        backgroundImage,
      }}
    >
      {showGap && <div styleName="gap">OR</div>}
      <div styleName="flex-container">
        <div styleName="icon">{icon}</div>
        <h3 styleName="title">{title}</h3>
        <p styleName="description">{description}</p>
        <Button
          size="large"
          type="secondary"
          onClick={onClick}
          disabled={isDisabled}
        >
          Select
        </Button>
      </div>
    </div>
  );
}

LandingBox.propTypes = {
  icon: PT.node,
  title: PT.string,
  description: PT.string,
  onClick: PT.func,
  isDisabled: PT.bool,
  showGap: PT.bool,
  backgroundImage: PT.string,
};

export default LandingBox;
