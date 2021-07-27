/**
 * Create New Team
 *
 * Container for Create New Team subroutes
 */
import React from "react";
import { useSelector } from "react-redux";
import CustomerScroll from "components/CustomerScroll";
import "./styles.module.scss";

const CreateNewTeam = (props) => {
  const { isLoading } = useSelector((state) => state.searchedRoles);

  return (
    <div>
      {props.children}
      {!isLoading && (
        <div styleName="logos">
          <CustomerScroll />
        </div>
      )}
    </div>
  );
};

export default CreateNewTeam;
