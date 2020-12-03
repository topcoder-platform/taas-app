/**
 * PositionCandidates
 *
 * Show a list of position candidates with sort select and pagination.
 */
import React, { useMemo, useState, useCallback } from "react";
import PT from "prop-types";
import _ from "lodash";
import CardHeader from "components/CardHeader";
import "./styles.module.scss";
import Select from "components/Select";
import {
  CANDIDATE_STATUS_TO_TITLE_TEXT,
  CANDIDATES_SORT_OPTIONS,
  CANDIDATES_SORT_BY,
  CANDIDATE_STATUS,
  POSITION_CANDIDATES_PER_PAGE,
} from "constants";
import { useUserDetails } from "hooks/useUserDetails";
import User from "components/User";
import SkillsSummary from "components/SkillsSummary";
import Button from "components/Button";
import Pagination from "components/Pagination";
import IconResume from "../../../assets/images/icon-resume.svg";
import { skillShape } from "components/SkillsList";

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
      return candidate2.skillMatched - candidate1.skillMatched;
    case CANDIDATES_SORT_BY.HANDLE:
      return new Intl.Collator().compare(
        candidate1.handle.toLowerCase(),
        candidate2.handle.toLowerCase()
      );
  }
};

const PositionCandidates = ({
  candidates,
  candidateStatus,
}) => {
  const userDetails = useUserDetails(_.map(candidates, "userId"));
  const [sortBy, setSortBy] = useState(CANDIDATES_SORT_BY.SKILL_MATCHED);
  const filteredCandidates = useMemo(
    () =>
      _.filter(candidates, { status: candidateStatus }).sort(
        createSortCandidatesMethod(sortBy)
      ),
    [candidates, candidateStatus, sortBy]
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

  return (
    <div styleName="position-candidates">
      <CardHeader
        title={`${CANDIDATE_STATUS_TO_TITLE_TEXT[candidateStatus]} (${filteredCandidates.length})`}
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
        <div styleName="no-candidates">
          No {CANDIDATE_STATUS_TO_TITLE_TEXT[candidateStatus]}
        </div>
      )}
      {filteredCandidates.length > 0 && (
        <div styleName="table">
          {pageCandidates.map((candidate) => (
            <div styleName="table-row" key={candidate.userId}>
              <div styleName="table-cell cell-user">
                <User
                  user={{
                    ...candidate,
                    photoUrl: _.get(userDetails[candidate.userId], "photoURL"),
                  }}
                  hideFullName
                />
              </div>
              <div styleName="table-cell cell-skills">
                <SkillsSummary
                  skills={candidate.skills}
                  skillMatched={candidate.skillMatched}
                  limit={7}
                />
                {candidate.resumeLink && (
                  <a
                    href={`${candidate.resumeLink}`}
                    styleName="resume-link"
                  >
                    <IconResume />
                    Download Resume
                  </a>
                )}
              </div>
              <div styleName="table-cell cell-action">
                {candidateStatus === CANDIDATE_STATUS.SHORTLIST ? (
                  <Button type="primary">Schedule Interview</Button>
                ) : (
                  <>
                    Interested in this candidate?
                    <div styleName="actions">
                      <Button type="secondary">No</Button>
                      <Button type="primary">Yes</Button>
                    </div>
                  </>
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
  );
};

PositionCandidates.propType = {
  candidates: PT.array,
  candidateStatus: PT.oneOf(Object.values(CANDIDATE_STATUS)),
};

export default PositionCandidates;
