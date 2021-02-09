/**
 * TeamCard
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";
import _ from "lodash";
import { Link, navigate } from "@reach/router";
import DataItem from "components/DataItem";
import IconCalendar from "../../../../assets/images/icon-calendar.svg";
import IconClock from "../../../../assets/images/icon-clock.svg";
import IconMoney from "../../../../assets/images/icon-money.svg";
import IconPeople from "../../../../assets/images/icon-people.svg";
import {
  formatDateRange,
  formatMoney,
  formatRemainingTimeForTeam,
  formatReportIssueUrl,
  formatConnectProjectUrl,
} from "utils/format";
import AvatarGroup from "components/AvatarGroup";
import ThreeDotsMenu from "components/ThreeDotsMenu";

const TeamCard = ({ team }) => {
  return (
    <div styleName="team-card">
      <div styleName="three-dots-menu">
        <ThreeDotsMenu
          options={[
            {
              label: "Open in Connect",
              action: () => {
                window.open(formatConnectProjectUrl(team.id));
              },
            },
            {
              separator: true
            },
            {
              label: "Manage Access",
              action: () => {
                navigate(`/taas/myteams/${team.id}/access`);
              }
            },
            {
              separator: true,
            },
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
          {team.startDate && team.endDate
            ? formatDateRange(team.startDate, team.endDate)
            : "TBD"}
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
          photoUrl: member.photo_url,
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
