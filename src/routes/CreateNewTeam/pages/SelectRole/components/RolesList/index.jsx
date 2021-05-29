/**
 * Roles List
 * Lists all roles available to apply to a job
 * and search for. Allows selecting roles and filtering
 * by name.
 */
import React, { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import PT from "prop-types";
import Input from "components/Input";
import PageHeader from "components/PageHeader";
import "./styles.module.scss";
import RoleItem from "../RoleItem";
import { INPUT_DEBOUNCE_DELAY } from "constants/";

function RolesList({ roles, selectedRoleId, onDescriptionClick, toggleRole }) {
  const [filteredRoles, setFilteredRoles] = useState(roles);
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
      setFilteredRoles(
        roles.filter((role) => role.name.toLowerCase().includes(filterText))
      );
    } else {
      setFilteredRoles(roles);
    }
  }, [debouncedFilter, roles]);

  return (
    <div styleName="roles-list">
      <PageHeader
        title="Select a Role"
        backTo="/taas/myteams/createnewteam"
        aside={
          <>
            <Input
              styleName="filter-input"
              placeholder="Find a role..."
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
      <div styleName="role-container">
        {filteredRoles.map(({ id, name, imageUrl }) => (
          <RoleItem
            key={id}
            id={id}
            name={name}
            imageUrl={imageUrl}
            onClick={toggleRole}
            onDescriptionClick={onDescriptionClick}
            isSelected={selectedRoleId === id}
          />
        ))}
      </div>
    </div>
  );
}

RolesList.propTypes = {
  roles: PT.array,
  selectedRoleId: PT.string,
  toggleRole: PT.func,
};

export default RolesList;
