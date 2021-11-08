/**
 * PositionCandidates
 *
 * Show a list of position candidates with sort select and pagination.
 */
import React, { useMemo, useState, useCallback, useEffect } from "react";
import PT from "prop-types";
import cn from "classnames";
import _ from "lodash";
import qs from "query-string";
import { useLocation, navigate } from "@reach/router";
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
  DISABLED_SCHEDULE_INTERVIEW,
} from "constants";
import User from "components/User";
import SkillsSummary from "components/SkillsSummary";
import Button from "components/Button";
import Pagination from "components/Pagination";
import IconResume from "../../../../assets/images/icon-resume.svg";
import { toastr } from "react-redux-toastr";
import { getJobById } from "services/jobs";
import { touchCandidateResume } from "services/teams";
import { PERMISSIONS } from "constants/permissions";
import { hasPermission } from "utils/permissions";
import ActionsMenu from "components/ActionsMenu";
import LatestInterview from "../LatestInterview";
import PreviousInterviewsPopup from "../PreviousInterviewsPopup";
import InterviewConfirmPopup from "../InterviewConfirmPopup";
import SelectCandidatePopup from "../SelectCandidatePopup";
import InterviewPopup from "../InterviewPopup";

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
  const location = useLocation();
  const [interviewDetailsOpen, setInterviewDetailsOpen] = useState(false);
  const [prevInterviewsOpen, setPrevInterviewsOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [interviewConfirmOpen, setInterviewConfirmOpen] = useState(false);
  const [selectCandidateOpen, setSelectCandidateOpen] = useState(false);
  const [isReject, setIsReject] = useState(false);

  const openInterviewDetailsPopup = (candidate) => {
    setSelectedCandidate(candidate);
    setInterviewDetailsOpen(true);
  };

  const openPrevInterviewsPopup = (candidate) => {
    setSelectedCandidate(candidate);
    setPrevInterviewsOpen(true);
  };

  const openSelectCandidatePopup = (candidate, isReject) => {
    setSelectedCandidate(candidate);
    isReject ? setIsReject(true) : setIsReject(false);
    setSelectCandidateOpen(true);
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

  const [isTouchingResume, setIsTouchingResume] = useState(false);
  const onClickResumeLink = (event) => {
    let targetData = event.target.dataset;
    let candidateId = targetData.candidateId;
    if (!candidateId) {
      return;
    }
    let resumeLink = targetData.resumeLink;
    setIsTouchingResume(true);
    touchCandidateResume(candidateId)
      .then(() => {
        if (resumeLink) {
          window.open(resumeLink, "_blank");
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsTouchingResume(false);
      });
  };

  const markCandidateSelected = useCallback(
    (candidate) => {
      return updateCandidate(candidate.id, {
        status: CANDIDATE_STATUS.SELECTED,
      })
        .then(() => {
          toastr.success("Candidate is marked as selected.");
          setSelectCandidateOpen(false);
        })
        .catch((error) => {
          toastr.error(
            "Failed to mark candidate as interested",
            error.toString()
          );
          setSelectCandidateOpen(false);
        });
    },
    [updateCandidate]
  );

  const markCandidateRejected = useCallback(
    (candidate) => {
      const hasInterviews =
        candidate.interviews && candidate.interviews.length > 0;
      return updateCandidate(candidate.id, {
        status: hasInterviews
          ? CANDIDATE_STATUS.CLIENT_REJECTED_INTERVIEW
          : CANDIDATE_STATUS.CLIENT_REJECTED_SCREENING,
      })
        .then(() => {
          toastr.success("Candidate is marked as declined.");
          setSelectCandidateOpen(false);
        })
        .catch((error) => {
          toastr.error(
            "Failed to mark candidate as not interested",
            error.toString()
          );
          setSelectCandidateOpen(false);
        });
    },
    [updateCandidate]
  );

  /*
   * Useeffect to check if calendar has been connected, then remove params 
   * found in redirected url and show toast notification
   */
  useEffect(() => {
    // wait till pageCandidates is properly set
    if (location.search && pageCandidates.length > 0) {
      const queryParams = qs.parse(location.search);

      if (queryParams.calendarConnected === 'true') {
        // check if any candidate found with id parsed from redirected url
        // if found, open Schedule Interview modal for that candidate
        const candidateToScheduleInterviewWith = _.find(pageCandidates, (c) => c.id = queryParams.interviewWithCandidate);
        if (candidateToScheduleInterviewWith) {
          setSelectedCandidate(candidateToScheduleInterviewWith);
          setInterviewDetailsOpen(true);
        }

        toastr.success('Calendar was successfully connected');
        navigate(location.pathname, { replace: true });
      }
      else {
        toastr.error(`Failed to connect calendar: ${queryParams.error}`);
        navigate(location.pathname, { replace: true });
      }
    }
  }, [location.search, pageCandidates])

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
          <div styleName="no-candidates">{statusFilter.noCandidateMessage}</div>
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
                    <button
                      type="button"
                      data-candidate-id={candidate.id}
                      data-resume-link={`${candidate.resume}`}
                      onClick={onClickResumeLink}
                      styleName={cn("resume-link", { busy: isTouchingResume })}
                    >
                      <IconResume />
                      Download Resume
                    </button>
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
                                openSelectCandidatePopup(candidate);
                              },
                            },
                            {
                              label: "Decline Candidate",
                              action: () => {
                                openSelectCandidatePopup(candidate, true);
                              },
                              style: "danger",
                            },
                          ]}
                        />
                      </div>
                    )}
                  {statusFilterKey === CANDIDATE_STATUS_FILTER_KEY.INTERESTED &&
                    hasPermission(PERMISSIONS.UPDATE_JOB_CANDIDATE) && (
                      <div styleName="actions">
                        <ActionsMenu
                          options={[
                            {
                              label: "Schedule Another Interview",
                              action: () => {
                                openInterviewDetailsPopup(candidate);
                              },
                              disabled: candidate.interviews.length === 3,
                              disabledReason: candidate.interviews.length === 3 ? DISABLED_SCHEDULE_INTERVIEW: ''
                            },
                            {
                              label: "View Previous Interviews",
                              action: () => {
                                openPrevInterviewsPopup(candidate);
                              },
                              disabled:
                                !!candidate.interviews !== true ||
                                candidate.interviews.length === 0,
                            },
                            {
                              separator: true,
                            },
                            {
                              label: "Select Candidate",
                              action: () => {
                                openSelectCandidatePopup(candidate);
                              },
                            },
                            {
                              label: "Decline Candidate",
                              action: () => {
                                openSelectCandidatePopup(candidate, true);
                              },
                              style: "danger",
                            },
                          ]}
                        />
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

      <InterviewPopup
        open={interviewDetailsOpen}
        onClose={() => setInterviewDetailsOpen(false)}
        candidate={selectedCandidate}
      />

      <InterviewConfirmPopup
        open={interviewConfirmOpen}
        onClose={() => setInterviewConfirmOpen(false)}
      />
      <SelectCandidatePopup
        candidate={selectedCandidate}
        open={selectCandidateOpen}
        isReject={isReject}
        select={markCandidateSelected}
        reject={markCandidateRejected}
        closeModal={() => setSelectCandidateOpen(false)}
      />
    </>
  );
};

PositionCandidates.propType = {
  position: PT.object,
  statusFilterKey: PT.oneOf(Object.values(CANDIDATE_STATUS_FILTER_KEY)),
};

export default PositionCandidates;
