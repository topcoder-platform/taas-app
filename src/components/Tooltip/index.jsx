import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";
import PT from "prop-types";
import cn from "classnames";
import compStyles from "./styles.module.scss";

/**
 * Displays a tooltip
 *
 * @param {Object} props component properties
 * @param {any} props.children tooltip target
 * @param {string} [props.className] class name to be added to root element
 * @param {any} props.content tooltip content
 * @param {number} [props.delay] postpone showing the tooltip after this delay
 * @param {boolean} [props.isDisabled] whether the tooltip is disabled
 * @param {import('@popperjs/core').Placement} [props.placement] tooltip's
 * preferred placement as defined in PopperJS documentation
 * @param {'absolute'|'fixed'} [props.strategy] tooltip positioning strategy
 * as defined in PopperJS documentation
 * @param {string} [props.targetClassName] class name to be added to element
 * wrapping around component's children
 * @param {string} [props.tooltipClassName] class name to be added to tooltip
 * element itself
 * @returns {JSX.Element}
 */
const Tooltip = ({
  children,
  className,
  content,
  delay = 150,
  isDisabled = false,
  placement = "top",
  strategy = "absolute",
  targetClassName,
  tooltipClassName,
}) => {
  const containerRef = useRef(null);
  const timeoutIdRef = useRef(0);
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement,
      strategy,
      modifiers: [
        { name: "arrow", options: { element: arrowElement, padding: 10 } },
        { name: "offset", options: { offset: [0, 10] } },
        { name: "preventOverflow", options: { padding: 15 } },
      ],
    }
  );

  const onMouseEnter = useCallback(() => {
    timeoutIdRef.current = window.setTimeout(() => {
      timeoutIdRef.current = 0;
      setIsTooltipShown(true);
    }, delay);
  }, [delay]);

  const onMouseLeave = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setIsTooltipShown(false);
  }, []);

  useEffect(() => {
    let observer = null;
    if (isTooltipShown && popperElement && update) {
      observer = new ResizeObserver(update);
      observer.observe(popperElement);
    }
    return () => {
      if (observer) {
        observer.unobserve(popperElement);
      }
    };
  }, [isTooltipShown, popperElement, update]);

  return (
    <div
      className={cn(compStyles.container, className)}
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span
        className={cn(compStyles.target, targetClassName)}
        ref={setReferenceElement}
      >
        {children}
      </span>
      {!isDisabled && isTooltipShown && !!content && (
        <div
          ref={setPopperElement}
          className={cn(compStyles.tooltip, tooltipClassName)}
          style={styles.popper}
          {...attributes.popper}
        >
          {content}
          <div
            className={compStyles.tooltipArrow}
            ref={setArrowElement}
            style={styles.arrow}
          />
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PT.node,
  className: PT.string,
  content: PT.node,
  delay: PT.number,
  isDisabled: PT.bool,
  placement: PT.string,
  strategy: PT.oneOf(["absolute", "fixed"]),
  targetClassName: PT.string,
  tooltipClassName: PT.string,
};

export default Tooltip;
