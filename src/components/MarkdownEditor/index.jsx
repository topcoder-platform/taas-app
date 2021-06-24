/*
 * MarkdownEditor
 */

import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import TuiEditor from "../TuiEditor";
import MarkdownEditorViewer from "../MarkdownEditorViewer";
import styles from "./styles.module.scss";

const MarkdownEditor = (props) => {
  const editorElement = useRef(null);

  const onChange = useCallback(() => {
    const markdown = editorElement.current.editorInst.getMarkdown();
    props.onChange(markdown);
  }, [props.onChange]);
  if (props.disabled) {
    return (
      <div styleName="editor-viewer">
        <MarkdownEditorViewer {...props} />
        {props.errorMessage && (
          <div styleName="message">{props.errorMessage}</div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(styles["editor-container"], props.className)}>
      <TuiEditor
        {...props}
        ref={editorElement}
        onChange={onChange}
        initialValue={props.value}
        toolbarItems={[
          "heading",
          "bold",
          "italic",
          "strike",
          "code",
          "divider",
          "quote",
          "codeblock",
          "hr",
          "divider",
          "ul",
          "ol",
          "divider",
          "image",
          "link",
        ]}
        plugins={[]}
      />
      {props.errorMessage && (
        <div styleName="message">{props.errorMessage}</div>
      )}
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default MarkdownEditor;
