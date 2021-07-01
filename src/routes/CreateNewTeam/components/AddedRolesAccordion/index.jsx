/**
 * SelectedRolesAccordion
 *
 * An expandable panel which can be used
 * for displaying selected role names with an accordion style
 */

import React, { useState } from "react";
import PT from "prop-types";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { deleteSearchedRole } from "../../actions";
import "./styles.module.scss";
import IconCrossLight from "../../../../assets/images/icon-cross-light.svg";

function AddedRolesAccordion({ addedRoles }) {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  return addedRoles.length ? (
    <div styleName="accordion">
      <button onClick={() => setIsOpen(!isOpen)} styleName="button">
        <div styleName="heading">
          <h4 styleName="title">
            {addedRoles.length}{" "}
            {addedRoles.length > 1 ? "positions have" : "position has"} been
            added.
          </h4>
        </div>
        <div styleName={cn("arrow", { [isOpen ? "up" : "down"]: true })}></div>
      </button>
      {isOpen && (
        <div styleName="panel">
          {addedRoles.map(({ name, searchId: id }) => (
            <div key={id} styleName="role-name">
              {name}
              <button onClick={() => dispatch(deleteSearchedRole(id))}>
                <IconCrossLight height="14px" width="14px" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : null;
}

AddedRolesAccordion.propTypes = {
  addedRoles: PT.arrayOf(PT.string),
};

export default AddedRolesAccordion;
