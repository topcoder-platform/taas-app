/**
 * Pagination
 *
 * Shows pagination with "prev" and "next" buttons.
 */
import React from "react";
import PT from "prop-types";
import _ from "lodash";
import Button from "components/Button";
import IconArrowDown from "../../assets/images/icon-arrow-down.svg";
import cn from "classnames";
import "./styles.module.scss";

const Pagination = ({ total, perPage, currentPage, onPageClick }) => {
  const pagesTotal = Math.ceil(total / perPage);
  const pages = _.range(1, pagesTotal + 1);

  return (
    <div styleName="pagination">
      {currentPage !== 1 && (
        <Button
          type="secondary"
          onClick={() => onPageClick(currentPage - 1)}
          styleName="prev"
        >
          <IconArrowDown />
          Prev
        </Button>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageClick(page)}
          type="secondary"
          styleName={cn("page", { current: page === currentPage })}
        >
          {page}
        </Button>
      ))}

      {currentPage !== pagesTotal && (
        <Button
          type="secondary"
          onClick={() => onPageClick(currentPage + 1)}
          styleName="next"
        >
          Next
          <IconArrowDown />
        </Button>
      )}
    </div>
  );
};

Pagination.propTypes = {
  total: PT.number.isRequired,
  perPage: PT.number.isRequired,
  currentPage: PT.number.isRequired,
  onPageClick: PT.func,
};

export default Pagination;
