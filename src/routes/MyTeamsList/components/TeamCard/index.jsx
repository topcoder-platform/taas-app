/**
 * TeamCard
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";
import _ from "lodash";
import { Link } from "@reach/router";
import DataItem from "components/DataItem";
import moment from "moment";
import { DAY_FORMAT } from "constants";
import IconCalendar from "../../../../assets/images/icon-calendar.svg";
import IconClock from "../../../../assets/images/icon-clock.svg";
import IconMoney from "../../../../assets/images/icon-money.svg";
import IconPeople from "../../../../assets/images/icon-people.svg";
import {
  formatMoney,
  formatRemainingTimeForTeam,
  formatReportIssueUrl,
} from "utils/format";
import AvatarGroup from "components/AvatarGroup";
import { useUserDetails } from "hooks/useUserDetails";
import ThreeDotsMenu from "components/ThreeDotsMenu";

const TeamCard = ({ team }) => {
  const userDetails = useUserDetails(_.map(team.resources, "id"));

  return (
    <div styleName="team-card">
      <div styleName="three-dots-menu">
        <ThreeDotsMenu
          options={[
            { label: "Team Feedback", action: () => {} },
            { label: "Team Invoices", action: () => {} },
            { label: "Team Reports", action: () => {} },
            { separator: true },
            { label: "Add Team Member", action: () => {} },
            { separator: true },
            {
              label: "Report an Issue",
              action: () => {
                window.open(formatReportIssueUrl(`TaaS Issue: ${team.name}`));
              },
            },
          ]}
        />
      </div>

      <div styleName="title-wrapper">
        <Link to={`/taas/myteams/${team.id}`} styleName="title">
          {team.name}
        </Link>
      </div>

      <div styleName="data-items">
        <DataItem title="Start - End Date" icon={<IconCalendar />}>
          {team.startDate && team.endDate ? (
            <>
              {moment(team.startDate).format(DAY_FORMAT)} -{" "}
              {moment(team.endDate).format(DAY_FORMAT)}
            </>
          ) : (
            <>TBD</>
          )}
        </DataItem>

        <DataItem title="Time Remaining" icon={<IconClock />}>
          {formatRemainingTimeForTeam(team)}
        </DataItem>

        <DataItem title="Weekly Cost" icon={<IconMoney />}>
          {formatMoney(team.weeklyCost || 0)}
        </DataItem>

        <DataItem title="Number of Team Members" icon={<IconPeople />}>
          {team.resources.length} of {team.totalPositions || 0}
        </DataItem>
      </div>

      <AvatarGroup
        users={team.resources.map((member) => ({
          ...member,
          photoUrl: _.get(userDetails[member.id], "photo_url"),
        }))}
      />
    </div>
  );
};

TeamCard.propTypes = {
  team: PT.shape({
    id: PT.number.isRequired,
    name: PT.string,
    resources: PT.array,
    positions: PT.array,
    startDate: PT.string,
    endDate: PT.string,
    weeklyCost: PT.number,
    rating: PT.number,
  }),
};

export default TeamCard;
