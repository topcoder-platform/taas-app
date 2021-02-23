/*
 * MarkdownViewer
 */

import React from "react";
import PropTypes from "prop-types";
import TuiEditorViewer from "../TuiEditorViewer";

const MarkdownViewer = (props) => (
  <TuiEditorViewer initialValue={props.value} />
);

MarkdownViewer.propTypes = {
  value: PropTypes.string,
};

export default MarkdownViewer;
