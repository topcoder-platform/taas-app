/**
 * SkillsList
 *
 * Shows list of skills with "N more" link which is showing tooltip with a full list of skills.
 */
import React, { useCallback, useState, useMemo, useEffect } from "react";
import PT from "prop-types";
import _ from "lodash";
import "./styles.module.scss";
import IconCheck from "../../assets/images/icon-check.svg";
import IconCross from "../../assets/images/icon-cross.svg";
import { usePopper } from "react-popper";
import OutsideClickHandler from "react-outside-click-handler";

const SkillsList = ({ requiredSkills, skills, limit = 3 }) => {
  const skillsToShow = skills.slice(0, limit);
  const skillsToHide = skills.slice(limit);

  // if has requiredSkills, show two columns, eles show only one column
  const showMatches = !!requiredSkills;
  const [isOpen, setIsOpen] = useState(false);
  const [isDelayClose, setIsDelayClose] = useState(false);
  const [isPopoverEnter, setIsPopoverEnter] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const otherSkills = useMemo(() => {
    return _.differenceBy(skills, requiredSkills, "id");
  }, [requiredSkills, skills]);
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

  useEffect(() => {
    if (isDelayClose) {
      const timer = setTimeout(() => {
        if (!isPopoverEnter) {
          close();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isDelayClose, isPopoverEnter, close]);

  const delayClose = useCallback(() => {
    setIsDelayClose(true);
  }, [setIsDelayClose]);
  const close = useCallback(() => {
    setIsOpen(false);
    setIsDelayClose(false);
    setIsPopoverEnter(false);
  }, [setIsOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
    setIsDelayClose(false);
  }, [setIsOpen]);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const enterPopover = useCallback(() => {
    setIsPopoverEnter(true);
  }, [setIsPopoverEnter]);

  return (
    <OutsideClickHandler onOutsideClick={close} display="inline">
      <div
        styleName="skills-list"
        onClick={toggle}
        onMouseEnter={open}
        onMouseLeave={delayClose}
        role="button"
        tabIndex={0}
        ref={setReferenceElement}
      >
        {_.map(skillsToShow, "name").join(", ")}

        {skillsToHide.length > 0 && (
          <>
            {" and "}
            <span styleName="more">{skillsToHide.length > 0} more</span>
          </>
        )}
        <>
          {isOpen && (
            <div
              styleName="popover"
              ref={setPopperElement}
              onMouseEnter={enterPopover}
              onMouseLeave={close}
              style={styles.popper}
              {...attributes.popper}
            >
              <div styleName="popover-content">
                {requiredSkills && (
                  <div styleName="skills-section">
                    <div styleName="skills-title">Required Job Skills</div>
                    <ul styleName="skills-list">
                      {!requiredSkills.length && <li>None</li>}
                      {requiredSkills.map((skill) => (
                        <li key={skill.id}>
                          {_.find(skills, { id: skill.id }) ? (
                            <IconCheck />
                          ) : (
                            <IconCross />
                          )}{" "}
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {otherSkills && (
                  <div styleName="skills-section">
                    <div styleName="skills-title">
                      {showMatches ? "Other User Skills" : "Required Skills"}
                    </div>
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
        </>
      </div>
    </OutsideClickHandler>
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
};

export default SkillsList;
