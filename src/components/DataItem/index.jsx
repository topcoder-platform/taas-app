/**
 * DataItem
 *
 * Shows data title and icon.
 */
import React from "react";
import PT from "prop-types";
import "./styles.module.scss";

const DataItem = ({ icon, title, children }) => {
  return (
    <div styleName="data-item">
      {icon}
      <div styleName="data">
        <div styleName="title">{title}</div>
        <div styleName="value">{children}</div>
      </div>
    </div>
  );
};

DataItem.propTypes = {
  icon: PT.node,
  title: PT.string,
  children: PT.node,
};

export default DataItem;
