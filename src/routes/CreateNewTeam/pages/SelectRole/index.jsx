/**
 * Select Role Page
 *
 * Allows selecting a role, searching for users
 * with that role, and submitting a job requiring the roles.
 */
import React, { useCallback, useState } from "react";
import { useData } from "hooks/useData";
import RolesList from "./components/RolesList";
import { getRoles } from "services/roles";
import { CUSTOM_ROLE_NAMES } from "constants";
import LoadingIndicator from "components/LoadingIndicator";
import RoleDetailsModal from "../../components/RoleDetailsModal";
import SearchAndSubmit from "../../components/SearchAndSubmit";

// Remove custom roles from role list
const removeCustomRoles = (roles) =>
  roles.filter(({ name }) => !CUSTOM_ROLE_NAMES.includes(name.toLowerCase()));

function SelectRole() {
  const [stages, setStages] = useState([
    { name: "Select a Role", isCurrent: true },
    { name: "Search Member" },
    { name: "Overview of the Results" },
  ]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [roleDetailsModalOpen, setRoleDetailsModalOpen] = useState(false);
  const [roleDetailsModalId, setRoleDetailsModalId] = useState(null);

  const [roles, loadingError] = useData(getRoles);

  const toggleRole = useCallback((id) => {
    setSelectedRoleId((selectedRoleId) => (id === selectedRoleId ? null : id));
  }, []);

  const onDescriptionClick = useCallback((roleId) => {
    setRoleDetailsModalId(roleId);
    setRoleDetailsModalOpen(true);
  }, []);

  if (!roles) {
    return <LoadingIndicator error={loadingError} />;
  }

  return (
    <SearchAndSubmit
      stages={stages}
      setStages={setStages}
      isCompletenessDisabled={!selectedRoleId}
      searchObject={{ roleId: selectedRoleId }}
      completenessStyle="role-selection"
      toRender={
        <>
          <RolesList
            roles={removeCustomRoles(roles)}
            selectedRoleId={selectedRoleId}
            toggleRole={toggleRole}
            onDescriptionClick={onDescriptionClick}
          />
          <RoleDetailsModal
            roleId={roleDetailsModalId}
            open={roleDetailsModalOpen}
            onClose={() => setRoleDetailsModalOpen(false)}
          />
        </>
      }
    />
  );
}

export default SelectRole;
