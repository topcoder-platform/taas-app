/**
 * Role Details Modal
 * Display role details.
 */
import React, { useState, useEffect } from "react";
import PT from "prop-types";
import Modal from "react-responsive-modal";
import Button from "components/Button";
import MarkdownEditorViewer from "../../../../components/MarkdownEditorViewer";
import IconCrossLight from "../../../../assets/images/icon-cross-light.svg";
import FallbackIcon from "../../../../assets/images/icon-role-fallback.svg";
import "./styles.module.scss";
import CenteredSpinner from "components/CenteredSpinner";
import { getRoleById } from "services/roles";
const modalStyle = {
  borderRadius: "10px",
  padding: "70px 80px 60px",
  maxWidth: "680px",
  width: "100%",
  height: "650px",
  margin: 0,
  "overflow-x": "hidden",
};

const containerStyle = {
  padding: "10px",
};

function RoleDetailsModal({ roleId, open, onClose }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [role, setRole] = useState(null);
  useEffect(() => {
    setRole(null);
    setIsLoading(true);
    getRoleById(roleId).then((response) => {
      setRole(response.data);
      setIsLoading(false);
    });
  }, [roleId]);

  return (
    <Modal
      open={open}
      center
      onClose={onClose}
      showCloseIcon={false}
      styles={{
        modal: modalStyle,
        modalContainer: containerStyle,
      }}
    >
      <div styleName="modal-body">
        {isLoading ? (
          <>
            <CenteredSpinner />
            <h5 styleName='loading'>Loading...</h5>
          </>
        ) : (
          <>
            {role && role.imageUrl && !imgError ? (
              <img
                src={role.imageUrl}
                onError={() => setImgError(true)}
                alt={role.name}
                styleName="role-icon"
              />
            ) : (
              <FallbackIcon styleName="role-icon" />
            )}
            <h5>{role?.name}</h5>
            <div styleName="tab-button-group">
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
            {!showSkills && <div styleName='desc-container'><MarkdownEditorViewer value={role?.description} /></div>}
            {showSkills && <p styleName='skill-tag-list'><div>{_.map(role?.listOfSkills, (s)=>
              <span styleName="skill-tag">{s}</span>
            )}</div></p> }
          </>
        )}
      </div>
      <div styleName="button-group">
        <Button type="primary" size="medium" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
}

RoleDetailsModal.propTypes = {
  roleId: PT.string,
  open: PT.bool,
  onClose: PT.func,
};

export default RoleDetailsModal;
