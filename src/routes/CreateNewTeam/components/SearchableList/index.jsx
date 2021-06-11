/**
 * SearchableList
 * wrap roles list and skills list
 * Allows selecting and filtering  by name.
 */
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import PT from "prop-types";
import Input from "components/Input";
import PageHeader from "components/PageHeader";
import "./styles.module.scss";
import { INPUT_DEBOUNCE_DELAY } from "constants/";

function SearchableList({title, inputPlaceholder, itemList, selectedRoleId, onDescriptionClick, toggleRole, renderItem, countElement}) {
  const [filteredItems, setFilteredItems] = useState(itemList);
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
    if (debouncedFilter.length > 0) {
      const filterText = debouncedFilter.toLowerCase();
      setFilteredItems(
        itemList.filter((item) => item.name.toLowerCase().includes(filterText))
      );
    } else {
      setFilteredItems(itemList);
    }
  }, [debouncedFilter, itemList]);

  return (
    <div styleName="searchable-list">
      <PageHeader
        title={title}
        backTo="/taas/myteams/createnewteam"
        aside={
          <div styleName="input-container">
            <Input
              styleName="filter-input"
              placeholder={inputPlaceholder}
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
          </div>
        }
      />
      {countElement}
      <div styleName="searchable-container">
        {filteredItems.map((item) => (
          renderItem(item)
        ))}
      </div>
    </div>
  );
}

SearchableList.propTypes = {
  itemList: PT.array,
  title: PT.string,
  inputPlaceholder: PT.string,
  renderItem: PT.func,
  countElement: PT.element,
  toggleRole: PT.func,
};

export default SearchableList;
