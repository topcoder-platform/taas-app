import { Router } from "@reach/router";
import React from "react";
import SearchContainer from "../SearchContainer";
import SubmitContainer from "../SubmitContainer";

function SearchAndSubmit(props) {
  return (
    <Router>
      <SearchContainer path="/" {...props} />
      <SubmitContainer path="result" {...props} />
    </Router>
  );
}

export default SearchAndSubmit;
