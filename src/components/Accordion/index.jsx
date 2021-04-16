import React, { useState } from "react";
import PT from "prop-types";
import "./styles.module.scss";

function Accordion(props) {
  const { title, sidebar, subhead, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} styleName="accordion">
        <div styleName="heading">
          <div>
            <h4 styleName="title">{title}</h4>
            <p>{subhead}</p>
          </div>
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
  children: PT.node,
};

export default Accordion;
