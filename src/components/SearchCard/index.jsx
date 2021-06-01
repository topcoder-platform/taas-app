/**
 * Search Card
 * A card that simulates searching for users
 * that match the given skills.
 */
import React, { useEffect, useState } from "react";
import "./styles.module.scss";
import IconEarthSearch from "../../assets/images/icon-earth-search.svg";
import WorldMapDotted from "../../assets/images/world-map-dotted.svg";
import WorldMapSearch1 from "../../assets/images/world-map-search1.svg";
import WorldMapSearch2 from "../../assets/images/world-map-search2.svg";

function SearchCard() {
  const [searchState, setSearchState] = useState(null);

  useEffect(() => {
    let timer2;
    const timer1 = setTimeout(() => {
      setSearchState("state1");
      timer2 = setTimeout(() => {
        setSearchState("state2");
      }, 800);
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div styleName="search-card">
      <div styleName="heading">
        <IconEarthSearch />
        <h3>Search..</h3>
        <p>Matching the criteria with 1.5 million members around the world..</p>
      </div>
      <div styleName="map-container">
        {!searchState ? (
          <WorldMapDotted />
        ) : searchState === "state1" ? (
          <WorldMapSearch1 />
        ) : (
          <WorldMapSearch2 />
        )}
      </div>
    </div>
  );
}

export default SearchCard;
