/**
 * Role Static Item
 * An item for the Role List component.
 */
import React from "react";
import { navigate } from "@reach/router";
import PT from "prop-types";
import cn from "classnames";
import FallbackIcon from "../../../../../../assets/images/icon-role-fallback.svg";
import "./styles.module.scss";

function RoleStaticCard() {
  const goToJdPage = () => {
    navigate("/taas/createnewteam/jd");
  };

  return (
    <div styleName="item-card">
      <p styleName="item-text">Don't see what you're looking for?</p>
      <button
        styleName="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          goToJdPage();
        }}
      >
        Describe your needs
      </button>
    </div>
  );
}

export default RoleStaticCard;
