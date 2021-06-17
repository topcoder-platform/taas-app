/**
 * Role Item
 * An item for the Role List component.
 * Shows an image and the name of the role.
 */
import React, { useState, useCallback } from "react";
import PT from "prop-types";
import cn from "classnames";
import FallbackIcon from "../../../../../../assets/images/icon-role-fallback.svg";
import "./styles.module.scss";

function RoleItem({
  id,
  name,
  imageUrl,
  onClick,
  onDescriptionClick,
  isSelected,
}) {
  const [error, setError] = useState(false);
  const onImgError = useCallback(() => setError(true), []);

  return (
    <div
      role="button"
      tabIndex="0"
      styleName={cn("item-card", { selected: isSelected })}
      onClick={() => onClick(id)}
    >
      {imageUrl && !error ? (
        <img
          src={imageUrl}
          onError={onImgError}
          alt={name}
          styleName="role-icon"
        />
      ) : (
        <FallbackIcon styleName="role-icon" />
      )}
      <p styleName="item-text">{name}</p>
      <button
        styleName="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onDescriptionClick(id);
        }}
      >
        Description
      </button>
    </div>
  );
}

RoleItem.propTypes = {
  id: PT.string,
  name: PT.string,
  onClick: PT.func,
  onDescriptionClick: PT.func,
  isSelected: PT.bool,
};

export default RoleItem;
