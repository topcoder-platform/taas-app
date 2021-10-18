import React, { useEffect, useState } from "react";
import PT from "prop-types";
import { TIME_ZONES } from "constants";
import moment from "moment";
import "./styles.module.scss";

const TimezoneSelector = ({ value, onChange }) => {
  const browserTimezone = moment.tz.guess(true);
  const [timezoneList, setTimezoneList] = useState([]);

  useEffect(() => {
    const isBrowserTimezoneAvailable = TIME_ZONES.findIndex(item => item === browserTimezone);

    if (isBrowserTimezoneAvailable === -1) {
      const finalList = [...TIME_ZONES, browserTimezone].sort();
      setTimezoneList(finalList);
      onChange(browserTimezone);
    } else {
      setTimezoneList(TIME_ZONES);
    }
  }, [browserTimezone]);

  return (
    <div styleName="timezone-selector">
      <div styleName="label">Interview Timezone</div>
      <select styleName="select" onChange={onChange} value={value} defaultValue={value}>
        {timezoneList.map((zone) => (
          <option
            key={zone}
            value={zone}
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
