import React from "react";
import PT from "prop-types";
import { TIME_ZONES } from "constants";
import moment from "moment";
import "./styles.module.scss";

const TimezoneSelector = ({ value, onChange }) => {
  return (
    <div styleName="timezone-selector">
      <div styleName="label">Interview Timezone</div>
      <select styleName="select" onChange={onChange}>
        {TIME_ZONES.map((zone) => (
          <option
            value={zone}
            selected={zone === value}
          >{`${zone} - UTC${moment().tz(zone).format("Z")}`}</option>
        ))}
      </select>
    </div>
  );
};

TimezoneSelector.propTypes = {
  value: PT.string,
  onChange: PT.func,
};

export default TimezoneSelector;
