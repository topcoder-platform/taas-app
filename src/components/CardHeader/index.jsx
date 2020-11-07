/**
 * CardHeader
 *
 * Shows title in a standard rounded-corner cards.
 * Also, can show something right to the title (aside).
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const CardHeader = ({ title, aside }) => {
  return (
    <header styleName="card-header">
      <h2 styleName="title">{title}</h2>
      {aside}
    </header>
  );
};

CardHeader.propTypes = {
  title: PT.string,
  aside: PT.node,
};

export default CardHeader;
