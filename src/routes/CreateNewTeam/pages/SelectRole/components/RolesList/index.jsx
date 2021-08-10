/**
 * Roles List
 * Lists all roles available to apply to a job
 * and search for. Allows selecting roles and filtering
 * by name.
 */
import React, { useCallback, useState } from "react";
import PT from "prop-types";
import RoleItem from "../RoleItem";
import RoleStaticCard from "../RoleStaticCard";
import ItemList from "../../../../components/ItemList";
import "./styles.module.scss";

function RolesList({ roles, selectedRoleId, onDescriptionClick, toggleRole }) {
  const [filteredRoles, setFilteredRoles] = useState(roles);

  const filterRoles = useCallback(
    (filterText) => {
      if (filterText === "") {
        setFilteredRoles(roles);
      } else {
        const filtered = roles.filter((role) =>
          role.name.toLowerCase().includes(filterText)
        );
        setFilteredRoles(filtered);
      }
    },
    [roles]
  );

  return (
    <ItemList
      title="Select A Role"
      filterPlaceholder="Find a role.."
      filterItems={filterRoles}
    >
      <p styleName="subtitle">Choose the role you want to fill</p>
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
      <RoleStaticCard />
    </ItemList>
  );
}

RolesList.propTypes = {
  roles: PT.array,
  selectedRoleId: PT.string,
  onDescriptionClick: PT.func,
  toggleRole: PT.func,
};

export default RolesList;
