import React from "react";
import PT from "prop-types";
import IconQuestionCircle from "../../../../assets/images/icon-question-circle.svg";
import "./styles.module.scss";

const assets = require.context(
  "../../../../assets/images/all-skill-images",
  false,
  /svg/
);

function SkillItem({ id, name }) {
  return (
    <div styleName="item-card">
      {assets && assets.keys().includes(`./id-${id}.svg`) ? (
        <img
          src={assets(`./id-${id}.svg`).default}
          alt={name}
          styleName="image"
        />
      ) : (
        <IconQuestionCircle styleName="image" />
      )}
      <p styleName="item-text">{name}</p>
    </div>
  );
}

SkillItem.propTypes = {
  id: PT.string,
  name: PT.string,
};

export default SkillItem;
