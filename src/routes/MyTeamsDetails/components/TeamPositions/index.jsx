/**
 * TeamPositions
 *
 * Shows list of team open positions.
 */
import React from "react";
import PT from "prop-types";
import moment from "moment";
import CardHeader from "components/CardHeader";
import SkillsList, { skillShape } from "components/SkillsList";
import Button from "components/Button";
import {
  DAY_FORMAT,
  POSITION_STATUS,
  POSITION_STATUS_TO_TEXT,
  RATE_TYPE,
} from "constants";
import "./styles.module.scss";

const TeamPositions = ({ teamId, positions }) => {
  return (
    <div styleName="team-positions">
      <CardHeader title="Open Positions" />

      {positions.length > 0 ? (
        <div styleName="table">
          {positions.map((position, index) => (
            <div styleName="table-row" key={index}>
              <div styleName="table-group-first">
                <div styleName="table-cell cell-skills">
                  <strong>{position.title}</strong>
                  <SkillsList skills={position.skills} limit={5} />
                </div>
                <div styleName="table-group-first-inner">
                  <div styleName="table-cell cell-date">
                    {moment(position.startDate).format(DAY_FORMAT)} -{" "}
                    {moment(position.endDate).format(DAY_FORMAT)}
                  </div>
                  <div styleName="table-cell cell-money">
                    {/* Hide rate as we don't have data for it */}
                    {/* {position.customerRate} */}
                  </div>
                </div>
              </div>
              <div styleName="table-group-second">
                <div styleName="table-cell cell-status">
                  {POSITION_STATUS_TO_TEXT[position.status]}
                </div>
                <div styleName="table-cell cell-action">
                  {position.status === POSITION_STATUS.IN_REVIEW && (
                    <Button
                      routeTo={`/taas/myteams/${teamId}/positions/${position.id}`}
                    >
                      select candidates
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div styleName="no-positions">No open positions</div>
      )}
    </div>
  );
};

TeamPositions.propTypes = {
  teamId: PT.string,
  positions: PT.arrayOf(
    PT.shape({
      title: PT.string,
      customerRate: PT.number,
      rateType: PT.oneOf(Object.values(RATE_TYPE)),
      skills: PT.arrayOf(skillShape),
      startDate: PT.string,
      endDate: PT.string,
      status: PT.oneOf(Object.values(POSITION_STATUS)),
    })
  ),
};

export default TeamPositions;
