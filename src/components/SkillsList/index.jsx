/**
 * SkillsList
 *
 * Shows list of skills with "N more" link which is showing tooltip with a full list of skills.
 * If `showMatches = true` it marks matched and not matched required skills.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import _ from "lodash";
import "./styles.module.scss";
import IconCheck from "../../assets/images/icon-check.svg";
import IconCross from "../../assets/images/icon-cross.svg";
import { usePopper } from "react-popper";
import OutsideClickHandler from "react-outside-click-handler";

const SkillsList = ({
  skills,
  requiredSkills,
  limit = 3,
  showMatches = false,
}) => {
  const otherSkills = _.differenceBy(skills, requiredSkills, "id");
  const skillsToShow = (skills || requiredSkills).slice(0, limit);
  const skillsToHide = (skills || requiredSkills).slice(limit);

  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top"],
        },
      },
      {
        name: "offset",
        options: {
          // use offset to move the dropdown slightly down
          offset: [0, 5],
        },
      },
      {
        name: "preventOverflow",
        options: {
          // padding from browser edges
          padding: 16,
        },
      },
      {
        name: "computeStyles",
        options: {
          // to fix bug in IE 11 https://github.com/popperjs/popper-core/issues/636
          gpuAcceleration: false,
        },
      },
    ],
  });

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <div styleName="skills-list">
      {_.map(skillsToShow, "name").join(", ")}
      {skillsToHide.length && (
        <>
          {" and "}
          <OutsideClickHandler onOutsideClick={close} display="inline">
            <span
              styleName="more"
              onClick={toggle}
              onMouseEnter={open}
              onMouseLeave={close}
              role="button"
              tabIndex={0}
              ref={setReferenceElement}
            >
              {skillsToHide.length} more
            </span>

            {isOpen && (
              <div
                styleName="popover"
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
              >
                <div styleName="popover-content">
                  {requiredSkills && (
                    <div styleName="skills-section">
                      <div styleName="skills-title">Required Skills</div>
                      <ul styleName="skills-list">
                        {requiredSkills.map((skill) => (
                          <li key={skill.id}>
                            {showMatches &&
                              (_.find(skills, { id: skill.id }) ? (
                                <IconCheck />
                              ) : (
                                <IconCross />
                              ))}{" "}
                            {skill.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {skills && (
                    <div styleName="skills-section">
                      <div styleName="skills-title">Other Skills</div>
                      <ul styleName="skills-list">
                        {otherSkills.map((skill) => (
                          <li key={skill.id}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </OutsideClickHandler>
        </>
      )}
    </div>
  );
};

export const skillShape = PT.shape({
  id: PT.string,
  name: PT.string,
});

SkillsList.propTypes = {
  skills: PT.arrayOf(skillShape),
  requiredSkills: PT.arrayOf(skillShape),
  limit: PT.number,
  showMatches: PT.bool,
};

export default SkillsList;
