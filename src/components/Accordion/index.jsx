/**
 * Accordion
 *
 * An expandable item which can be used
 * repeatadly to form an accordion style display
 */

import React, { useState } from "react";
import PT from "prop-types";
import "./styles.module.scss";

function Accordion(props) {
  const { title, sidebar, status, subhead, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div styleName="accordion">
      <button onClick={() => setIsOpen(!isOpen)} styleName="button">
        {isOpen ? (
          <div styleName="down-arrow" />
        ) : (
          <div styleName="right-arrow" />
        )}
        <div styleName="heading">
          <div>
            <h4 styleName="title">{title}</h4>
            <p>{subhead}</p>
          </div>
          <p styleName="status">{status}</p>
          <p>{sidebar}</p>
        </div>
      </button>
      {isOpen && <div styleName="panel">{children}</div>}
    </div>
  );
}

Accordion.propTypes = {
  title: PT.string,
  sidebar: PT.string,
  subhead: PT.string,
  status: PT.string,
  children: PT.node,
};

export default Accordion;
