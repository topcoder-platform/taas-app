/**
 * TeamPositions
 *
 * Shows list of team open positions.
 */
import React from "react";
import PT from "prop-types";
import CardHeader from "components/CardHeader";
import SkillsList, { skillShape } from "components/SkillsList";
import Button from "components/Button";
import { POSITION_STATUS, POSITION_STATUS_TO_TEXT, RATE_TYPE } from "constants";
import "./styles.module.scss";
import { formatJobDate, formatOpenPositions } from "utils/format";
import { Link } from "@reach/router";

const TeamPositions = ({ teamId, positions, resources }) => {
  return (
    <div styleName="team-positions">
      <div styleName="team-position-header">
        <CardHeader title="Open Positions" />
        <div styleName="actions">
          <Button
            type="secondary"
            size="medium"
            routeTo={`/taas/myteams/${teamId}/positions/new`}
          >
            Create Position
          </Button>
        </div>
      </div>
      {positions.length > 0 ? (
        <div styleName="table">
          {positions.map((position, index) => (
            <div styleName="table-row" key={index}>
              <div styleName="table-group-first">
                <div styleName="table-cell cell-skills">
                  <Link
                    styleName="job-title"
                    to={`/taas/myteams/${teamId}/positions/${position.id}`}
                  >
                    <strong>{position.title}</strong>
                  </Link>
                  <SkillsList skills={position.skills} limit={5} />
                  <div>{formatOpenPositions(position, resources)}</div>
                </div>
                <div styleName="table-group-first-inner">
                  <div styleName="table-cell cell-date">
                    {formatJobDate(position.startDate, position.duration)}
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
                      routeTo={`/taas/myteams/${teamId}/positions/${position.id}/candidates`}
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
  resources: PT.arrayOf(
    PT.shape({
      id: PT.string,
      handle: PT.string,
      firstName: PT.string,
      lastName: PT.string,
      skills: PT.arrayOf(skillShape),
      skillsMatched: PT.number,
    })
  ),
};

export default TeamPositions;
