/*
 * TuiEditor
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Editor } from "@toast-ui/react-editor";
import styles from "./styles.module.scss";

const TuiEditor = (props) => {
  const [editorElement, setEditorElement] = useState(null);
  const onChange = () => {
    const mk = editorElement.editorInst.getMarkdown();
    props.onChange(mk);
  };
  return (
    <div className={cn(styles["editor-container"], props.className)}>
      <Editor
        {...props}
        ref={setEditorElement}
        onChange={onChange}
        initialValue={props.value}
      />
    </div>
  );
};

TuiEditor.defaultProps = {
  height: "320px",
  minHeight: "320px",
  initialValue: "",
  previewStyle: "",
  initialEditType: "wysiwyg",
  language: "en-US",
  useCommandShortcut: true,
  customHTMLSanitizer: null,
  frontMatter: false,
  hideModeSwitch: true,
  referenceDefinition: false,
  usageStatistics: false,
  useDefaultHTMLSanitizer: true,
};

TuiEditor.propTypes = {
  // Editor's initial value
  value: PropTypes.string,
  className: PropTypes.string,
  // Markdown editor's preview style (tab, vertical)
  previewStyle: PropTypes.string.isRequired,
  // Editor's height style value. Height is applied as border-box ex) '300px', '100%', 'auto'
  height: PropTypes.string,
  // Initial editor type (markdown, wysiwyg)
  initialEditType: PropTypes.string,
  // Editor's min-height style value in pixel ex) '300px'
  minHeight: PropTypes.string,
  // The placeholder text of the editable element.
  placeholder: PropTypes.string,
  // hide mode switch tab bar
  hideModeSwitch: PropTypes.bool,
  // language, 'en-US'
  language: PropTypes.string,
  // whether use keyboard shortcuts to perform commands
  useCommandShortcut: PropTypes.bool,
  // It would be emitted when editor fully load1
  onLoad: PropTypes.func,
  // It would be emitted when content changed
  onChange: PropTypes.func,
  // It would be emitted when format change by cursor position
  onStateChange: PropTypes.func,
  // It would be emitted when editor get focus
  onFocus: PropTypes.func,
  // It would be emitted when editor loose focus
  onBlur: PropTypes.func,
  // hooks
  hooks: PropTypes.arrayOf(PropTypes.object),
  // send hostname to google analytics
  usageStatistics: PropTypes.bool,
  // use default htmlSanitizer
  useDefaultHTMLSanitizer: PropTypes.bool,
  // toolbar items.
  toolbarItems: PropTypes.arrayOf(PropTypes.object),
  // Array of plugins. A plugin can be either a function or an array in the form of [function, options].
  plugins: PropTypes.arrayOf(PropTypes.object),
  // Using extended Autolinks specified in GFM spec
  extendedAutolinks: PropTypes.object,
  // convertor extention
  customConvertor: PropTypes.object,
  // Attributes of anchor element that should be rel, target, contenteditable, hreflang, type
  linkAttribute: PropTypes.object,
  // Object containing custom renderer functions correspond to markdown node
  customHTMLRenderer: PropTypes.object,
  // whether use the specification of link reference definition
  referenceDefinition: PropTypes.bool,
  // custom HTML sanitizer
  customHTMLSanitizer: PropTypes.func,
  // whether use the front matter
  frontMatter: PropTypes.bool,
};

export default TuiEditor;
