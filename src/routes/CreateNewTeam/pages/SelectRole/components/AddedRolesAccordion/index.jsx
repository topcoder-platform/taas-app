/**
 * SelectedRolesAccordion
 *
 * An expandable panel which can be used
 * for displaying selected role names with an accordion style
 */

import React, { useState } from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";

function AddedRolesAccordion({ addedRoles }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div styleName="accordion">
      <button onClick={() => setIsOpen(!isOpen)} styleName="button">
        <div styleName="heading">
          <h4 styleName="title">
            {addedRoles.length}{" "}
            {addedRoles.length > 1 ? "roles have" : "role has"} been added.
          </h4>
        </div>
        <div styleName={cn("arrow", { [isOpen ? "up" : "down"]: true })}></div>
      </button>
      {isOpen && (
        <div styleName="panel">
          {addedRoles.map(({ name }) => (
            <div styleName="role-name">{name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

AddedRolesAccordion.propTypes = {
  addedRoles: PT.arrayOf(PT.string),
};

export default AddedRolesAccordion;
