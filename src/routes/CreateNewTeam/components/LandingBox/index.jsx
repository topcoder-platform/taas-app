import React from "react";
import PT from "prop-types";
import "./styles.module.scss";
import Button from "components/Button";

function LandingBox({
  icon,
  title,
  description,
  path,
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
      <div styleName="flex-container">
        <div styleName="icon-and-text">
          <div styleName="icon">{icon}</div>
          <div>
            <h3 styleName="title">{title}</h3>
            <p>{description}</p>
          </div>
        </div>
        <Button
          size="large"
          type="secondary"
          routeTo={path}
          disabled={isDisabled}
        >
          Select
        </Button>
      </div>
      <div styleName="bg-icon">{icon}</div>
    </div>
  );
}

LandingBox.propTypes = {
  icon: PT.node,
  title: PT.string,
  description: PT.string,
  path: PT.string,
  isDisabled: PT.bool,
  backgroundImage: PT.string,
};

export default LandingBox;
