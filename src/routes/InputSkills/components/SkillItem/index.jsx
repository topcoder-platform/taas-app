import React from "react";
import PT from "prop-types";
import IconQuestionCircle from "../../../../assets/images/icon-question-circle.svg";
import "./styles.module.scss";
import cn from "classnames";

const assets = require.context(
  "../../../../assets/images/all-skill-images",
  false,
  /svg/
);

function SkillItem({ id, name, onClick, isSelected }) {
  return (
    <div
      styleName={cn("item-card", { selected: isSelected })}
      onClick={() => onClick(id)}
    >
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
  onClick: PT.func,
  isSelected: PT.bool,
};

export default SkillItem;
