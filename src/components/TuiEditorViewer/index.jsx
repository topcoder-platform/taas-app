/*
 * TuiEditorViewer
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Viewer } from "@toast-ui/react-editor";

const TuiEditorViewer = (props) => <Viewer initialValue={props.value} />;

TuiEditorViewer.propTypes = {
  value: PropTypes.string,
};

export default TuiEditorViewer;
