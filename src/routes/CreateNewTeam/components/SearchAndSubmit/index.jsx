import { Router } from "@reach/router";
import React from "react";
import { useSelector } from "react-redux";
import SearchContainer from "../SearchContainer";
import SubmitContainer from "../SubmitContainer";

function SearchAndSubmit(props) {
  const { addedRoles, previousSearchId } = useSelector(
    (state) => state.searchedRoles
  );

  return (
    <Router>
      <SearchContainer
        path="/"
        addedRoles={addedRoles}
        previousSearchId={previousSearchId}
        {...props}
      />
      <SubmitContainer path="result" addedRoles={addedRoles} {...props} />
    </Router>
  );
}

export default SearchAndSubmit;
