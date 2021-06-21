/**
 * Role Details Modal
 * Display role details.
 */
import React, { useState, useEffect, useMemo } from "react";
import PT from "prop-types";
import Button from "components/Button";
import FallbackIcon from "../../../../assets/images/icon-role-fallback.svg";
import "./styles.module.scss";
import { getRoleById } from "services/roles";
import BaseCreateModal from "../BaseCreateModal";
import MarkdownViewer from "components/MarkdownEditorViewer";

function RoleDetailsModal({ roleId, open, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (roleId) {
      setImgError(false);
      setIsLoading(true);
      getRoleById(roleId)
        .then((response) => {
          setRole(response.data);
        })
        .catch(() => {
          setRole({ name: "Unable to Load Description" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [roleId]);

  const headerIcon = useMemo(
    () =>
      role && role.imageUrl && !imgError ? (
        <img
          src={role.imageUrl}
          onError={() => setImgError(true)}
          alt={role.name}
        />
      ) : (
        <FallbackIcon />
      ),
    [role, imgError]
  );

  const skills = role && role.listOfSkills ? role.listOfSkills : [];

  const hideSkills = () => {
    onClose();
    setTimeout(() => setShowSkills(false), 0);
  };

  const closeButton = (
    <Button type="primary" size="medium" onClick={hideSkills}>
      Close
    </Button>
  );

  return (
    <BaseCreateModal
      open={open}
      onClose={hideSkills}
      hideCloseIcon
      isLoading={isLoading}
      loadingMessage="Loading..."
      title={role?.name}
      headerIcon={headerIcon}
      buttons={closeButton}
      darkHeader
    >
      <div>
        <div styleName="button-group">
          <Button
            type={!showSkills ? "segment-selected" : "segment"}
            size="small"
            onClick={() => setShowSkills(false)}
          >
            Job Description
          </Button>
          <Button
            type={showSkills ? "segment-selected" : "segment"}
            size="small"
            onClick={() => setShowSkills(true)}
          >
            Skills
          </Button>
        </div>
        {showSkills ? (
          <ul styleName="body skill-list">
            {skills.map((skill, i) => (
              <li styleName="skill-item" key={i}>
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <div styleName="markdown-container">
            <MarkdownViewer value={role?.description} />
          </div>
        )}
      </div>
    </BaseCreateModal>
  );
}

RoleDetailsModal.propTypes = {
  roleId: PT.string,
  open: PT.bool,
  onClose: PT.func,
};

export default RoleDetailsModal;
