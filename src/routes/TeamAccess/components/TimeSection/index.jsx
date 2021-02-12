/**
 * Formats and displays working hours
 * and local time for team members
 */

import React from "react";
import PT from "prop-types";
import moment from "moment";
require("moment-timezone");

import {
  formatLocalTime,
  formatTimeOffset,
  formatWorkTime,
} from "utils/format";
import IconSun from "../../../../assets/images/icon-sun.svg";
import IconMoon from "../../../../assets/images/icon-moon.svg";
import "./styles.module.scss";

function TimeSection({ timeZone, start, end }) {
  let tz;
  if (timeZone) {
    tz = moment().tz(timeZone);
  }

  const hasWorkTime = () => {
    if (timeZone && start && end) return true;
    return false;
  };

  const isWorkTime = () => {
    let nowH = Number.parseInt(tz.format("H"), 10);
    const startH = Number.parseInt(
      moment({ hour: start.split(":")[0] }).format("H"),
      10
    );
    let endH = Number.parseInt(
      moment({ hour: end.split(":")[0] }).format("H"),
      10
    );

    if (endH <= startH) {
      endH += 24;
      if (nowH < startH) {
        nowH += 24;
      }
    }

    return nowH >= startH && nowH < endH;
  };

  return (
    <div styleName="time-container">
      <div styleName="table-group">
        <div styleName="table-cell">
          {hasWorkTime() ? (
            <span>
              WH: {formatWorkTime(start)} - {formatWorkTime(end)}{" "}
              {formatTimeOffset(tz)}
            </span>
          ) : (
            "WH: Unknown"
          )}
        </div>
      </div>
      <div styleName="table-group">
        {hasWorkTime() && (
          <div styleName="table-cell">
            {isWorkTime() ? <IconSun /> : <IconMoon />}
          </div>
        )}
        <div styleName="table-cell">
          Local time: {timeZone ? formatLocalTime(tz) : "Unknown"}
        </div>
      </div>
    </div>
  );
}

TimeSection.propTypes = {
  timeZone: PT.string,
  start: PT.string,
  end: PT.string,
};

export default TimeSection;
