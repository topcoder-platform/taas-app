/**
 * CircularProgressBar component.
 * Displays a circular progress bar.
 * Size and strokeWidth are customizable.
 * Allows appending children inside bar.
 */
import React, { useEffect, useState, useRef } from "react";
import PT from "prop-types";

const CircularProgressBar = ({ size, progress, children, strokeWidth }) => {
  const [offset, setOffset] = useState(0);
  const circleRef = useRef(null);
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  useEffect(() => {
    const progressOffset = (1 - progress) * circumference;
    setOffset(progressOffset);
    circleRef.current.style = "transition: stroke-dashoffset 850ms ease-in-out";
  }, [setOffset, progress, circumference, offset]);
  return (
    <>
      <svg width={size} height={size}>
        <circle
          stroke="lightgray"
          fill="transparent"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          ref={circleRef}
          stroke="#219174"
          fill="transparent"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <foreignObject x="35" y="50" width={size * 0.6} height={size * 0.6}>
          {children ? children : `${progress}%`}
        </foreignObject>
      </svg>
    </>
  );
};

CircularProgressBar.propTypes = {
  size: PT.number.isRequired,
  progress: PT.number.isRequired,
  children: PT.node,
  strokeWidth: PT.number.isRequired,
};

export default CircularProgressBar;
