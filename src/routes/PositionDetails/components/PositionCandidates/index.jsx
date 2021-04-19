/**
 * PositionCandidates
 *
 * Show a list of position candidates with sort select and pagination.
 */
import React, { useMemo, useState, useCallback, useEffect } from "react";
import PT from "prop-types";
import _ from "lodash";
import CardHeader from "components/CardHeader";
import "./styles.module.scss";
import Select from "components/Select";
import {
  CANDIDATE_STATUS_FILTERS,
  CANDIDATE_STATUS_FILTER_KEY,
  CANDIDATES_SORT_OPTIONS,
  CANDIDATES_SORT_BY,
  CANDIDATE_STATUS,
  POSITION_CANDIDATES_PER_PAGE,
} from "constants";
import User from "components/User";
import SkillsSummary from "components/SkillsSummary";
import Button from "components/Button";
import Pagination from "components/Pagination";
import IconResume from "../../../../assets/images/icon-resume.svg";
import { toastr } from "react-redux-toastr";
import { getJobById } from "services/jobs";
import { PERMISSIONS } from "constants/permissions";
import { hasPermission } from "utils/permissions";
import ActionsMenu from "components/ActionsMenu";
import LatestInterview from "../LatestInterview";
import InterviewDetailsPopup from "../InterviewDetailsPopup";
import PreviousInterviewsPopup from "../PreviousInterviewsPopup";
import InterviewConfirmPopup from "../InterviewConfirmPopup";

/**
 * Generates a function to sort candidates
 *
 * @param {string} sortBy sort by
 *
 * @returns {Function} sorting function
 */
const createSortCandidatesMethod = (sortBy) => (candidate1, candidate2) => {
  switch (sortBy) {
    case CANDIDATES_SORT_BY.SKILL_MATCHED:
      return candidate2.skillsMatched - candidate1.skillsMatched;
    case CANDIDATES_SORT_BY.HANDLE:
      return new Intl.Collator().compare(
        candidate1.handle.toLowerCase(),
        candidate2.handle.toLowerCase()
      );
  }
};

/**
 * Populates candidate objects with `skillsMatched` property
 * which define the number of candidate skills that match position skills
 *
 * @param {object} position position
 * @param {object} candidate candidate for position
 */
const populateSkillsMatched = (position, candidate) => ({
  ...candidate,
  skillsMatched: _.intersectionBy(position.skills, candidate.skills, "id"),
});

const PositionCandidates = ({ position, statusFilterKey, updateCandidate }) => {
  const [interviewDetailsOpen, setInterviewDetailsOpen] = useState(false);
  const [prevInterviewsOpen, setPrevInterviewsOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [interviewConfirmOpen, setInterviewConfirmOpen] = useState(true);

  const openInterviewDetailsPopup = (candidate) => {
    setSelectedCandidate(candidate);
    setInterviewDetailsOpen(true);
  };

  const openPrevInterviewsPopup = (candidate) => {
    setSelectedCandidate(candidate);
    setPrevInterviewsOpen(true);
  };

  const { candidates } = position;
  const [sortBy, setSortBy] = useState(CANDIDATES_SORT_BY.SKILL_MATCHED);
  const statusFilter = useMemo(
    () => _.find(CANDIDATE_STATUS_FILTERS, { key: statusFilterKey }),
    [statusFilterKey]
  );

  const filteredCandidates = useMemo(
    () =>
      _.chain(candidates)
        .map((candidate) => populateSkillsMatched(position, candidate))
        .filter((candidate) => statusFilter.statuses.includes(candidate.status))
        .value()
        .sort(createSortCandidatesMethod(sortBy)),
    [candidates, statusFilter, sortBy, position]
  );

  const onSortByChange = useCallback(
    (newSortBy) => {
      setSortBy(newSortBy);
    },
    [setSortBy]
  );

  const [perPage, setPerPage] = useState(POSITION_CANDIDATES_PER_PAGE);
  const [page, setPage] = useState(1);
  const showMore = useCallback(() => {
    const newPerPage = perPage + POSITION_CANDIDATES_PER_PAGE;
    const nextPageFirstItemNumber = page * perPage + 1;
    const newPage = Math.floor(nextPageFirstItemNumber / newPerPage) + 1;
    setPerPage(newPerPage);
    setPage(newPage);
  }, [perPage, setPerPage, page, setPage]);

  useEffect(() => {
    setPage(1);
  }, [statusFilterKey]);

  const pagesTotal = Math.ceil(filteredCandidates.length / perPage);

  const pageCandidates = useMemo(
    () => filteredCandidates.slice((page - 1) * perPage, page * perPage),
    [filteredCandidates, page, perPage]
  );

  const onPageClick = useCallback(
    (newPage) => {
      setPage(newPage);
    },
    [setPage]
  );

  const markCandidateShortlisted = useCallback(
    (candidateId) => {
      updateCandidate(candidateId, {
        status: CANDIDATE_STATUS.SHORTLIST,
      })
        .then(() => {
          toastr.success("Candidate is marked as interested.");
        })
        .catch((error) => {
          toastr.error(
            "Failed to mark candidate as interested",
            error.toString()
          );
        });
    },
    [updateCandidate]
  );

  const markCandidateRejected = useCallback(
    (candidateId) => {
      updateCandidate(candidateId, {
        status: CANDIDATE_STATUS.REJECTED,
      })
        .then(() => {
          toastr.success("Candidate is marked as not interested.");
        })
        .catch((error) => {
          toastr.error(
            "Failed to mark candidate as not interested",
            error.toString()
          );
        });
    },
    [updateCandidate]
  );

  return (
    <>
      <div styleName="position-candidates">
        <CardHeader
          title={`${statusFilter.title} (${filteredCandidates.length})`}
          aside={
            <Select
              options={CANDIDATES_SORT_OPTIONS}
              value={sortBy}
              onChange={onSortByChange}
              styleName="sort-select"
            />
          }
        />

        {filteredCandidates.length === 0 && (
          <div styleName="no-candidates">No {statusFilter.title}</div>
        )}
        {filteredCandidates.length > 0 && (
          <div styleName="table">
            {pageCandidates.map((candidate) => (
              <div styleName="table-row" key={candidate.id}>
                <div styleName="table-cell cell-user">
                  <User
                    user={{
                      ...candidate,
                      photoUrl: candidate.photo_url,
                    }}
                    hideFullName
                  />
                </div>
                <div styleName="table-cell cell-skills">
                  <SkillsSummary
                    skills={candidate.skills}
                    requiredSkills={position.skills}
                    limit={7}
                  />
                  {candidate.resume && (
                    <a
                      href={`${candidate.resume}`}
                      styleName="resume-link"
                      target="_blank"
                    >
                      <IconResume />
                      Download Resume
                    </a>
                  )}
                </div>
                {statusFilterKey === CANDIDATE_STATUS_FILTER_KEY.INTERESTED && (
                  <div styleName="table-cell cell-prev-interviews">
                    <LatestInterview interviews={candidate.interviews} />
                  </div>
                )}
                <div styleName="table-cell cell-action">
                  {statusFilterKey === CANDIDATE_STATUS_FILTER_KEY.TO_REVIEW &&
                    hasPermission(PERMISSIONS.UPDATE_JOB_CANDIDATE) && (
                      <div styleName="actions">
                        <ActionsMenu
                          options={[
                            {
                              label: "Schedule Interview",
                              action: () => {
                                openInterviewDetailsPopup(candidate);
                              },
                            },
                            {
                              separator: true,
                            },
                            {
                              label: "Select Candidate",
                              action: () => {
                                markCandidateShortlisted(candidate.id);
                              },
                            },
                            {
                              label: "Decline Candidate",
                              action: () => {
                                markCandidateRejected(candidate.id);
                              },
                            },
                          ]}
                        />
                      </div>
                    )}
                  {statusFilterKey === CANDIDATE_STATUS_FILTER_KEY.INTERESTED &&
                    hasPermission(PERMISSIONS.UPDATE_JOB_CANDIDATE) && (
                      <div styleName="actions">
                        <Button
                          onClick={() => openInterviewDetailsPopup(candidate)}
                        >
                          Schedule Another Interview
                        </Button>
                        {candidate.interviews.length > 0 && (
                          <Button
                            type="secondary"
                            onClick={() => openPrevInterviewsPopup(candidate)}
                          >
                            View Previous Interviews
                          </Button>
                        )}
                      </div>
                    )}
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
              filteredCandidates.length === 0 || // if no candidates to show
              page === pagesTotal // if we are already on the last page
            }
          >
            Show More
          </Button>
          {filteredCandidates.length > 0 && (
            <Pagination
              total={filteredCandidates.length}
              currentPage={page}
              perPage={perPage}
              onPageClick={onPageClick}
            />
          )}
        </div>
      </div>
      <PreviousInterviewsPopup
        open={prevInterviewsOpen}
        onClose={() => setPrevInterviewsOpen(false)}
        candidate={selectedCandidate}
      />
      <InterviewDetailsPopup
        open={interviewDetailsOpen}
        onClose={() => setInterviewDetailsOpen(false)}
        candidate={selectedCandidate}
      />
      <InterviewConfirmPopup
        open={interviewConfirmOpen}
        onClose={() => setInterviewConfirmOpen(false)}
      />
    </>
  );
};

PositionCandidates.propType = {
  position: PT.object,
  statusFilterKey: PT.oneOf(Object.values(CANDIDATE_STATUS_FILTER_KEY)),
};

export default PositionCandidates;
