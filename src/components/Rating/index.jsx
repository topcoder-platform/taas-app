/**
 * Rating
 *
 * Shows rating using stars and value.
 * If `short = true` then shows only one full star and value.
 */
import React from "react";
import PT from "prop-types";
import _ from "lodash";
import IconStartFull from "../../assets/images/icon-star-full.svg";
import IconStartEmpty from "../../assets/images/icon-star-empty.svg";
import "./styles.module.scss";

const Rating = ({
  value,
  maxRating = 5,
  starSize = 16,
  starSpacing = 4,
  short = false,
}) => {
  const starIndexes = _.range(0, maxRating);
  // calculate the width of spaces between stars which contains at least little bit of yellow color
  const totalSpacingWidth = Math.floor(value) * starSpacing;
  // calculate the width of yellow color in all stars
  const totalStarsWidth = value * starSize;
  const fullStarsWidth = totalStarsWidth + totalSpacingWidth;

  return (
    <div styleName="rating">
      {short ? (
        <div styleName="star">
          <IconStartFull />
        </div>
      ) : (
        <div styleName="stars-container">
          <div styleName="stars-full" style={{ width: fullStarsWidth }}>
            <div styleName="stars">
              {starIndexes.map((index) => (
                <IconStartFull
                  key={index}
                  style={{
                    marginRight: starSpacing,
                    width: starSize,
                    height: starSize,
                  }}
                />
              ))}
            </div>
          </div>
          <div styleName="stars">
            {starIndexes.map((index) => (
              <IconStartEmpty
                key={index}
                style={{
                  marginRight: starSpacing,
                  width: starSize,
                  height: starSize,
                }}
              />
            ))}
          </div>
        </div>
      )}
      {value}
    </div>
  );
};

Rating.propTypes = {
  value: PT.number.isRequired,
  maxRating: PT.number,
  starSize: PT.number,
  starSpacing: PT.number,
  short: PT.bool,
};

export default Rating;
