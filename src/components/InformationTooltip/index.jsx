/**
 * Information Tooltip
 * Icon which reveals a tooltip on mouse hover
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import { usePopper } from "react-popper";
import IconInformationCircle from "../../assets/images/icon-information-circle.svg";
import "./styles.module.scss";

function InformationTooltip({ text, iconSize = "16px" }) {
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

  const iconStyle = {
    width: iconSize,
    height: iconSize,
  };

  return (
    <div>
      <div
        style={iconStyle}
        ref={setReferenceElement}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        <IconInformationCircle styleName="circle" />
      </div>
      {isTooltipShown && (
        <div
          styleName="tooltip"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div styleName="tooltip-content">{text}</div>
          <div
            styleName="tooltip-arrow"
            ref={setArrowElement}
            style={styles.arrow}
          />
        </div>
      )}
    </div>
  );
}

InformationTooltip.propTypes = {
  iconSize: PT.string,
  text: PT.string,
};

export default InformationTooltip;
