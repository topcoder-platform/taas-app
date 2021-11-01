import React, { useState, useEffect } from "react";
import cn from "classnames";
import PT from "prop-types";
import {
  SCHEDULE_INTERVIEW_STEPS,
  DAYS,
  DEFAULT_SELECTED_DAYS,
  BUTTON_TYPE,
  BUTTON_SIZE,
  POPUP_STAGES,
} from "constants";
import moment from "moment";
import StepsIndicator from "../../StepsIndicator";
import TimezoneSelector from "components/TimezoneSelector";
import Select from "components/Select";
import IconDelete from "../../../../../assets/images/icon-delete-slot.svg";
import IconPlus from "../../../../../assets/images/icon-plus.svg";
import "./styles.module.scss";
import Button from "components/Button";
import { formatAs2Digits } from "utils/format";

/**
 * This component lets user to choose the availability of the interview candidate
 * @returns
 */
const ManageAvailability = ({ scheduleDetails, onContinue }) => {
  const timezones = moment.tz.names();
  const emptySlot = [
    {
      start: "",
      end: "",
      days: DEFAULT_SELECTED_DAYS,
    },
  ];
  const [slots, setSlots] = useState(emptySlot);
  const [timezone, setTimezone] = useState(moment.tz.guess(true));
  const days = Object.values(DAYS);
  const daysMapped = Object.keys(DAYS);
  const timeSlots = new Array(25)
    .join(",")
    .split(",")
    .map((item, index) => index)
    .reduce(
      (acc, currentVal) => [
        ...acc,
        {
          time12HourFormat:
            currentVal < 12
              ? `${!currentVal ? 12 : currentVal}:00`
              : `${Math.abs((currentVal === 12 ? 0 : currentVal) - 12)}:00`,
          time24HourFormat: currentVal === 24 ? '00:00' : `${formatAs2Digits(currentVal)}:00`,
          suffix: currentVal < 12 ? "AM" : (currentVal === 24 ? "AM" : "PM"),
        },
      ],
      []
    );

  useEffect(() => {
    if (scheduleDetails.slots && scheduleDetails.slots.length > 0) {
      setSlots(scheduleDetails.slots);
    }
  }, [scheduleDetails]);

  /**
   * This adds a new slot to the existing slots
   */
  const onAddSlot = () => {
    const copied = [...slots, ...emptySlot];
    setSlots(copied);
  };

  /**
   * The on change time handler
   */
  const onChangeTime = (changedIndex, field, value) => {
    const changed = slots.map((item, index) => {
      if (index === changedIndex) {
        return {
          ...item,
          [field]: value,
        };
      }

      return item;
    });

    setSlots(changed);
  };

  /**
   * This function called when the day is changed
   */
  const onDayChanged = (changedDay, slotIndex) => {
    const changed = slots.map((item, index) => {
      const isDeselect = item.days.indexOf(changedDay) > -1;
      const days = isDeselect
        ? item.days.filter((item) => item !== changedDay)
        : [...item.days, changedDay];
      if (index === slotIndex) {
        return {
          ...item,
          days,
        };
      }

      return item;
    });

    setSlots(changed);
  };

  /**
   * The function called when the slot is removed
   */
  const onRemoveSlot = (slotIndex) => {
    const changed = slots.filter((item, index) => {
      if (index === slotIndex) {
        return false;
      }

      return true;
    });

    setSlots(changed);
  };

  // Set time zone
  const onChangeTimezone = (event) => {
    if (event && event.target) {
      setTimezone(event.target.value);
    }
  };

  /**
   * Validation function which determines whether to disable the button on not
   */
  const isDisabled = () => {
    let isDisable = false;

    for (let i = 0; i < slots.length; i++) {
      const item = slots[i];
      isDisable = !(item.days.length > 0 && !!item.start && !!item.end);
      if (isDisable) {
        return isDisable;
      }
    }

    isDisable = !!!timezone;

    return isDisable;
  };

  const onContinueAhead = () => {
    onContinue(POPUP_STAGES.SELECT_DURATION, {
      timezone,
      slots,
    });
  };

  return (
    <div styleName="manage-availability">
      <StepsIndicator
        steps={SCHEDULE_INTERVIEW_STEPS}
        currentStep="availability"
      />
      <TimezoneSelector onChange={onChangeTimezone} value={timezone} />
      <div styleName="when-to-schedule">When can interviews be scheduled?</div>
      <div styleName="interview-slots">
        {slots.map((slot, slotIndex) => {
          const timeSlotsOptions = timeSlots.map((item) => ({
            label: `${item.time12HourFormat} ${item.suffix}`,
            value: item.time24HourFormat,
          }));
          const startTimeOptions = [
            { label: "Start Time", value: "" },
            ...timeSlotsOptions.map((item) => ({
              label: item.label,
              value: item.value,
              disabled: slot.end && slot.end != '00:00' && item.value !== '00:00' && slot.end <= item.value,
            })),
          ];
          const endTimeOptions = [
            { label: "End Time", value: "" },
            ...timeSlotsOptions.map((item) => ({
              label: item.label,
              value: item.value,
              disabled: slot.start && slot.start !== '00:00' && item.value !== '00:00' && slot.start >= item.value,
            })),
          ];

          return (
            <div styleName="slot" key={slotIndex}>
              <div styleName="days">
                {days.map((day, index) => (
                  <div
                    key={daysMapped[index]}
                    onClick={() => onDayChanged(daysMapped[index], slotIndex)}
                    styleName={cn("day", {
                      "selected-day": slot.days.indexOf(daysMapped[index]) > -1,
                    })}
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div styleName="time-wrapper">
                <div styleName="start-time">
                  <Select
                    options={startTimeOptions}
                    value={slot.start}
                    onChange={(value) =>
                      onChangeTime(slotIndex, "start", value)
                    }
                  />
                </div>
                <div styleName="end-time">
                  <Select
                    options={endTimeOptions}
                    value={slot.end}
                    onChange={(value) => onChangeTime(slotIndex, "end", value)}
                  />
                </div>
                {slots.length !== 1 && (
                  <div
                    styleName="delete-slot-wrapper"
                    onClick={() => onRemoveSlot(slotIndex)}
                  >
                    <IconDelete />
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div styleName="add-button-wrapper">
          <Button
            onClick={onAddSlot}
            type={BUTTON_TYPE.SECONDARY}
            size={BUTTON_SIZE.EXTRA_SMALL}
          >
            <div styleName="plus-icon-wrapper">
              <IconPlus />
            </div>
            ADD
          </Button>
        </div>
      </div>

      <div styleName="button-wrapper">
        <div
          onClick={() =>
            onContinue(POPUP_STAGES.MANAGE_CALENDAR, {
              timezone,
              slots,
            })
          }
          styleName="manage-calendar"
        >
          Manage connected calendar
        </div>
        <Button
          onClick={() => onContinueAhead()}
          disabled={isDisabled()}
          size={BUTTON_SIZE.MEDIUM}
          type={BUTTON_TYPE.PRIMARY}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

ManageAvailability.propTypes = {
  scheduleDetails: PT.shape({
    timezone: PT.string,
    slots: PT.arrayOf(
      PT.shape({
        days: PT.array,
        end: PT.string,
        start: PT.string,
      })
    ),
  }),
  onContinue: PT.func,
};

export default ManageAvailability;
