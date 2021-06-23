import React, { useEffect, useState } from "react";
import PT from "prop-types";
import { useDebounce } from "react-use";
import { INPUT_DEBOUNCE_DELAY } from "constants/";
import PageHeader from "components/PageHeader";
import "./styles.module.scss";
import Input from "components/Input";

function ItemList({
  filterItems,
  title,
  filterPlaceholder,
  subtitle,
  children,
}) {
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useDebounce(
    () => {
      setDebouncedFilter(filter);
    },
    INPUT_DEBOUNCE_DELAY,
    [filter]
  );

  useEffect(() => {
    const filterText = debouncedFilter.toLowerCase();
    filterItems(filterText);
  }, [debouncedFilter, filterItems]);

  return (
    <div styleName="item-list">
      <PageHeader
        title={title}
        backTo="/taas/createnewteam"
        aside={
          <>
            <Input
              styleName="filter-input"
              placeholder={filterPlaceholder}
              value={filter}
              onChange={onFilterChange}
            />
            {filter && (
              <span
                role="button"
                tabIndex="0"
                title="Clear"
                styleName="clear-input-button"
                onClick={() => setFilter("")}
              >
                X
              </span>
            )}
          </>
        }
      />
      {subtitle && <p styleName="subtitle">{subtitle}</p>}
      <div styleName="list-container">{children}</div>
    </div>
  );
}

ItemList.propTypes = {
  filterItems: PT.func,
  title: PT.string,
  filterPlaceholder: PT.string,
  subtitle: PT.string,
  children: PT.node,
};

export default ItemList;
