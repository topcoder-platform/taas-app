/**
 * Skill Tag
 * An item for the matched skill result page.
 * Shows an image and the name of the skill.
 */
import React from "react";
import PT from "prop-types";
import IconSkill from "../../../../assets/images/icon-skill.svg";
import "./styles.module.scss";
import cn from "classnames";

const assets = require.context(
  "../../../../assets/images/all-skill-images",
  false,
  /svg/
);

function SkillTag({ id, name, unmatched }) {
  return (
    <div styleName={cn("tag", { unmatched })}>
      {assets && assets.keys().includes(`./id-${id}.svg`) ? (
        <img
          src={assets(`./id-${id}.svg`).default}
          alt={name}
          styleName="image"
        />
      ) : (
        <IconSkill styleName="image" />
      )}
      <p styleName="item-text">{name}</p>
    </div>
  );
}

SkillTag.propTypes = {
  id: PT.string,
  name: PT.string,
  unmatched: PT.bool,
};

export default SkillTag;
