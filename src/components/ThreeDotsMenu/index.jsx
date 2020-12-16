/**
 * ThreeDotsMenu
 *
 * Shows icon "..." with dropdown menu with actions.
 */
import React, { useState, useCallback } from "react";
import PT from "prop-types";
import "./styles.module.scss";
import OutsideClickHandler from "react-outside-click-handler";
import IconThreeDots from "../../assets/images/icon-three-dots.svg";
import { usePopper } from "react-popper";

const ThreeDotsMenu = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
    modifiers: [
      {
        name: "flip",
        options: {
          fallbackPlacements: ["bottom"],
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
        name: "arrow",
        // padding should be equal to border-radius of the dropdown
        options: { element: arrowElement, padding: 8 },
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

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const closeOnAction = useCallback(
    (action) => () => {
      close();
      action && action();
    },
    [close]
  );

  return (
    <OutsideClickHandler onOutsideClick={close}>
      <div
        onClick={toggle}
        role="button"
        tabIndex={0}
        styleName="handle"
        ref={setReferenceElement}
      >
        <IconThreeDots />
      </div>

      {isOpen && (
        <div
          styleName="popover"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <div styleName="list">
            {options.map((option, index) => {
              if (option.separator) {
                return <div key={index} styleName="separator" />;
              } else {
                return (
                  <div
                    key={option.label}
                    onClick={closeOnAction(option.action)}
                    role="button"
                    tabIndex={0}
                    styleName="option"
                  >
                    {option.label}
                  </div>
                );
              }
            })}
          </div>
          <div
            ref={setArrowElement}
            style={styles.arrow}
            styleName="popover-arrow"
          />
        </div>
      )}
    </OutsideClickHandler>
  );
};

ThreeDotsMenu.propTypes = {
  options: PT.arrayOf(
    PT.shape({
      label: PT.string,
      action: PT.func,
      separator: PT.bool,
    })
  ),
};

export default ThreeDotsMenu;
