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
        {/* if `children` is pure text, then we apply styling to it
            but otherwise with don't apply styling */}
        {_.isString(children) ? (
          <div styleName="value">{children}</div>
        ) : (
          <div styleName="value-component">{children}</div>
        )}
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
