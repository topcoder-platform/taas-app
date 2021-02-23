/*
 * MarkdownEditor
 */

import React, { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import TuiEditor from "../TuiEditor";
import styles from "./styles.module.scss";

const MarkdownEditor = (props) => {
  const editorElement = useRef(null);

  const onChange = useCallback(() => {
    const mk = editorElement.current.editorInst.getMarkdown();
    props.onChange(mk);
  }, []);

  return (
    <div className={cn(styles["editor-container"], props.className)}>
      <TuiEditor
        {...props}
        ref={editorElement}
        onChange={onChange}
        initialValue={props.value}
      />
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default MarkdownEditor;
