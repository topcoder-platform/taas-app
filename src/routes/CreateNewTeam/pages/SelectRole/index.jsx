/**
 * Select Role Page
 *
 * Gets project id from the router.
 *
 * Allows selecting a role, searching for users
 * with that role, and submitting a job requiring the roles.
 */
import React, { useCallback, useState } from "react";
import { useData } from "hooks/useData";
import RolesList from "./components/RolesList";
import { getRoles } from "services/roles";
import LoadingIndicator from "components/LoadingIndicator";
import RoleDetailsModal from "../../components/RoleDetailsModal";
import SearchContainer from "../../components/SearchContainer";

function SelectRole({ location: { state: locationState } }) {
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

  const resetState = () => {
    setSelectedRoleId(null);
    setRoleDetailsModalId(false);
    setRoleDetailsModalId(null);
  };

  if (!roles) {
    return <LoadingIndicator error={loadingError} />;
  }

  return (
    <SearchContainer
      stages={stages}
      setStages={setStages}
      isCompletenessDisabled={!selectedRoleId}
      searchObject={{ roleId: selectedRoleId }}
      completenessStyle="role-selection"
      locationState={locationState}
      reloadRolesPage={resetState}
    >
      <RolesList
        roles={roles}
        selectedRoleId={selectedRoleId}
        toggleRole={toggleRole}
        onDescriptionClick={onDescriptionClick}
      />
      <RoleDetailsModal
        roleId={roleDetailsModalId}
        open={roleDetailsModalOpen}
        onClose={() => setRoleDetailsModalOpen(false)}
      />
    </SearchContainer>
  );
}

export default SelectRole;
