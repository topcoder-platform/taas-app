/**
 * Avatar
 *
 * Shows user photo and fallback to user initials if no photo.
 */
import React, { useState, useCallback } from "react";
import PT from "prop-types";
import ReactAvatar from "react-avatar";
import { usePopper } from "react-popper";
import AvatarPlaceholder from "../../assets/images/avatar-placeholder.svg";
import { formatFullName } from "utils/format";
import "./styles.module.scss";

const Avatar = ({ photoUrl, firstName, lastName, handle, size = 40 }) => {
  const fullName = formatFullName(firstName, lastName);
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
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
          // use offset to move the tooltip slightly up
          offset: [0, 10],
        },
      },
      {
        name: "arrow",
        // padding should be equal to border-radius of the tooltip
        options: { element: arrowElement, padding: 8 },
      },
    ],
  });

  const showTooltip = useCallback(() => {
    setIsTooltipShown(true);
  }, [setIsTooltipShown]);

  const hideTooltip = useCallback(() => {
    setIsTooltipShown(false);
  }, [setIsTooltipShown]);

  return (
    <div styleName="avatar-container" style={{ width: size, height: size }}>
      <div
        styleName="avatar"
        ref={setReferenceElement}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ width: size, height: size }}
      >
        {!photoUrl && !fullName && !handle ? (
          <AvatarPlaceholder />
        ) : (
          <ReactAvatar src={photoUrl} name={fullName || handle} size={size} />
        )}
      </div>
      {isTooltipShown && (
        <div
          styleName="tooltip"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div styleName="tooltip-content">{handle}</div>
          <div
            styleName="tooltip-arrow"
            ref={setArrowElement}
            style={styles.arrow}
          />
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  photoUrl: PT.string,
  firstName: PT.string,
  lastName: PT.string,
  handle: PT.string,
  size: PT.number,
};

export default Avatar;
