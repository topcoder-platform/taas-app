/**
 * TeamPositions
 *
 * Shows list of team open positions.
 */
import React from "react";
import PT from "prop-types";
import moment from "moment";
import CardHeader from "components/CardHeader";
import SkillsList from "components/SkillsList";
import Button from "components/Button";
import { formatMoney } from "utils/format";
import {
  DAY_FORMAT,
  POSITION_STATUS,
  POSITION_STATUS_TO_TEXT,
} from "constants";
import "./styles.module.scss";

const TeamPositions = ({ positions }) => {
  return (
    <div styleName="team-positions">
      <CardHeader title="Open Positions" />

      {positions.length > 0 ? (
        <table styleName="table">
          {positions.map((position, index) => (
            <div styleName="table-row" key={index}>
              <div styleName="table-group-first">
                <div styleName="table-cell cell-skills">
                  <strong>{position.title}</strong>
                  <SkillsList
                    skills={position.skills}
                    requiredSkills={position.requiredSkills}
                    limit={5}
                  />
                </div>
                <div styleName="table-group-first-inner">
                  <div styleName="table-cell cell-date">
                    {moment(position.startDate).format(DAY_FORMAT)} -{" "}
                    {moment(position.endDate).format(DAY_FORMAT)}
                  </div>
                  <div styleName="table-cell cell-money">
                    {formatMoney(position.weeklyCost)}
                  </div>
                </div>
              </div>
              <div styleName="table-group-second">
                <div styleName="table-cell cell-status">
                  {POSITION_STATUS_TO_TEXT[position.status]}
                </div>
                <div styleName="table-cell cell-action">
                  {position.status === POSITION_STATUS.AVAILABLE_FOR_REVIEW && (
                    <Button>select candidates</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </table>
      ) : (
        <div styleName="no-positions">No open positions</div>
      )}
    </div>
  );
};

TeamPositions.propTypes = {
  positions: PT.arrayOf(
    PT.shape({
      title: PT.string,
      weeklyCost: PT.number,
      skills: PT.arrayOf(PT.string),
      requiredSkills: PT.arrayOf(PT.string),
      startDate: PT.string,
      endDate: PT.string,
      status: PT.oneOf(Object.values(POSITION_STATUS)),
    })
  ),
};

export default TeamPositions;
