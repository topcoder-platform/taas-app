import React from "react";
import "./styles.module.scss";
import IconEarthSearch from "../../../../assets/images/icon-earth-search.svg";
import CenteredSpinner from "components/CenteredSpinner";

function SearchCard() {
  return (
    <div styleName="search-card">
      <div styleName="heading">
        <IconEarthSearch />
        <h3>Search..</h3>
        <p>Matching the criteria with 1.5 million members around the world..</p>
      </div>
      <CenteredSpinner />
    </div>
  );
}

export default SearchCard;
