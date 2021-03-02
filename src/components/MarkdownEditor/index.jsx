/*
 * MarkdownEditor
 */

import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import TuiEditor from "../TuiEditor";
import MarkdownEditorViewer from "../MarkdownEditorViewer";
import styles from "./styles.module.scss";
import { DISABLED_DESCRIPTION_MESSAGE } from "constants";

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
        <div styleName="message">{DISABLED_DESCRIPTION_MESSAGE}</div>
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
          'heading',
          'bold',
          'italic',
          'strike',
          'code',
          'divider',
          'quote',
          'codeblock',
          'hr',
          'divider',
          'ul',
          'ol',
          'divider',
          'image',
          'link',
        ]}
        plugins={[]}
      />
    </div>
  );
};

MarkdownEditor.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default MarkdownEditor;
