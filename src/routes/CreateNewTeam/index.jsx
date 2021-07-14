/**
 * Create New Team
 *
 * Container for Create New Team subroutes
 */
import React from "react";
import CustomerScroll from "components/CustomerScroll";
import "./styles.module.scss";

const CreateNewTeam = (props) => (
  <div>
    {props.children}
    <div styleName="logos">
      <CustomerScroll />
    </div>
  </div>
);

export default CreateNewTeam;
