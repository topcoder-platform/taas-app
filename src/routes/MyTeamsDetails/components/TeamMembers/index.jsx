/**
 * TeamMembers
 *
 * Shows list of team members with a filter and pagination.
 */
import React, { useState, useCallback, useMemo } from "react";
import PT from "prop-types";
import "./styles.module.scss";
import _ from "lodash";
import { navigate } from "@reach/router";
import User from "components/User";
import CardHeader from "components/CardHeader";
// import Rating from "components/Rating";
import SkillsSummary from "components/SkillsSummary";
import ActionsMenu from "components/ActionsMenu";
import Button from "components/Button";
import Pagination from "components/Pagination";
import { TEAM_MEMBERS_PER_PAGE } from "constants";
import {
  formatDateRange,
  formatMoney,
  formatReportIssueUrl,
  formatRequestExtensionUrl,
} from "utils/format";
import Input from "components/Input";
import { skillShape } from "components/SkillsList";

const TeamMembers = ({ team }) => {
  const { resources, jobs } = team;
  const [filter, setFilter] = useState("");

  const filteredMembers = useMemo(
    () =>
      resources
        // populate resources with job data first
        .map((member) => ({
          ...member,
          job: _.find(jobs, { id: member.jobId }) || {},
        }))
        // now we can filter resources
        .filter((member) => {
          const filterLowerCase = filter.toLowerCase().trim();
          const lookupFields = _.compact([
            member.handle,
            member.firstName,
            member.lastName,
            `${member.firstName} ${member.lastName}`, // full name
            member.job.title,
            ..._.map(member.skills, "name"),
          ]).map((field) => field.toLowerCase());

          return _.some(
            lookupFields,
            (field) => field.indexOf(filterLowerCase) > -1
          );
        }),
    [resources, filter, jobs]
  );

  const onFilterChange = useCallback(
    (event) => {
      setFilter(event.target.value);
      setPage(1);
    },
    [setFilter]
  );

  const [perPage, setPerPage] = useState(TEAM_MEMBERS_PER_PAGE);
  const [page, setPage] = useState(1);
  const showMore = useCallback(() => {
    const newPerPage = perPage + TEAM_MEMBERS_PER_PAGE;
    const nextPageFirstItemNumber = page * perPage + 1;
    const newPage = Math.floor(nextPageFirstItemNumber / newPerPage) + 1;
    setPerPage(newPerPage);
    setPage(newPage);
  }, [perPage, setPerPage, page, setPage]);

  const pagesTotal = Math.ceil(filteredMembers.length / perPage);

  const pageMembers = useMemo(
    () => filteredMembers.slice((page - 1) * perPage, page * perPage),
    [filteredMembers, page, perPage]
  );

  const onPageClick = useCallback(
    (newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  return (
    <div styleName="team-members">
      <CardHeader
        title="ALL TEAM MEMBERS"
        aside={
          <Input
            placeholder="Filter by handle, name, role or skill"
            styleName="filter-input overwrite-width"
            value={filter}
            onChange={onFilterChange}
          />
        }
      />
      {resources.length === 0 && <div styleName="no-members">No members</div>}
      {resources.length > 0 && filteredMembers.length === 0 && (
        <div styleName="no-members">No members matching filter</div>
      )}
      {filteredMembers.length > 0 && (
        <div styleName="table">
          {pageMembers.map((member) => (
            <div styleName="table-row" key={member.id}>
              <div styleName="table-group-first">
                <div styleName="table-cell cell-user">
                  <User
                    user={{
                      ...member,
                      photoUrl: member.photo_url,
                    }}
                    handleLinkTo={`/taas/myteams/${team.id}/rb/${member.id}`}
                  />
                </div>
                <div styleName="table-group-first-inner">
                  <div styleName="table-cell cell-role">{member.job.title}</div>
                  <div styleName="table-cell cell-date">
                    {formatDateRange(member.startDate, member.endDate)}
                  </div>
                  <div styleName="table-cell cell-money">
                    {member.customerRate && member.customerRate > 0
                      ? formatMoney(member.customerRate)
                      : ""}
                  </div>
                </div>
              </div>
              <div styleName="table-group-second">
                <div styleName="table-cell cell-skills">
                  <SkillsSummary
                    skills={member.skills}
                    requiredSkills={member.job.skills}
                  />
                </div>
                <div styleName="table-group-second-inner">
                  <div styleName="table-cell cell-rating">
                    {/* Hide Rating for now as per https://github.com/topcoder-platform/taas-app/issues/18 */}
                    {/* <Rating value={member.rating} short /> */}
                  </div>
                  <div styleName="table-cell cell-action">
                    <ActionsMenu
                      options={[
                        {
                          label: "Edit Member Details",
                          action: () => {
                            navigate(
                              `/taas/myteams/${team.id}/rb/${member.id}/edit`
                            );
                          },
                        },
                        {
                          separator: true,
                        },
                        {
                          label: "Report an Issue",
                          action: () => {
                            window.open(
                              formatReportIssueUrl(
                                `Issue with ${member.handle} on ${team.name}`
                              )
                            );
                          },
                        },
                        {
                          label: "Request an Extension",
                          action: () => {
                            window.open(
                              formatRequestExtensionUrl(
                                `Request extension for ${member.handle} on ${team.name}`
                              )
                            );
                          },
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div styleName="controls">
        <Button
          type="secondary"
          onClick={showMore}
          disabled={
            filteredMembers.length === 0 || // if no members to show
            page === pagesTotal // if we are already on the last page
          }
        >
          Show More
        </Button>
        {filteredMembers.length > 0 && (
          <Pagination
            total={filteredMembers.length}
            currentPage={page}
            perPage={perPage}
            onPageClick={onPageClick}
          />
        )}
      </div>
    </div>
  );
};

TeamMembers.propTypes = {
  team: PT.shape({
    name: PT.string,
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
  }),
};

export default TeamMembers;
