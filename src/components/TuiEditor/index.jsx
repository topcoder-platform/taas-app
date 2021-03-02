/*
 * TuiEditor
 * wrap toast-ui editor with react
 */
import React from "react";
import PropTypes from "prop-types";
import Editor from "@toast-ui/editor";

class TuiEditor extends React.Component {
  constructor(props) {
    super(props);
    this.rootEl = React.createRef();
    this.editorInst = null;
  }

  getRootElement() {
    return this.rootEl.current;
  }

  getInstance() {
    return this.editorInst;
  }

  bindEventHandlers(props) {
    Object.keys(this.props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        // off function has issue
        // when add `onFocus` function, the headings popup will not hide automatically
        // this.editorInst.off(eventName);
        this.editorInst.on(eventName, props[key]);
      });

    // always add `https` to the links if link was added without `http` or `https`
    this.editorInst.on('convertorAfterHtmlToMarkdownConverted', (inputMarkdown) => {
      const outputMarkdown = inputMarkdown.replace(/\[([^\]]*)\]\((?!https?)([^\)]+)\)/g, "[$1](https://$2)")
      return outputMarkdown;
    });
  }

  componentDidMount() {
    this.editorInst = new Editor({
      el: this.rootEl.current,
      ...this.props,
    });

    this.bindEventHandlers(this.props);
    this.addFormatLinkListener();
  }

  /*
   * automatically add `https://` when  the link is not prefixed with http(s)://
   */
  addFormatLinkListener() {
    const eventManager = this.editorInst.eventManager.events;
    const handlers = eventManager.get("command");
    const formatLinkHandler = (eventType, linkData) => {
      // intercept the command
      if (eventType === "AddLink") {
        if (!/^http(s?):\/\//.test(linkData.url)) {
          linkData.url = "https://" + linkData.url;
        }
      }
      return linkData;
    };

    // must move format handler before the original handlers
    handlers.unshift(formatLinkHandler);
    eventManager.set("command", handlers);
  }

  componentWillUnmount() {
    Object.keys(this.props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        this.editorInst.off(eventName);
      });
    this.editorInst.off("command");
  }

  shouldComponentUpdate(nextProps) {
    const instance = this.getInstance();
    const { height, previewStyle } = nextProps;

    if (this.props.height !== height) {
      instance.height(height);
    }

    if (this.props.previewStyle !== previewStyle) {
      instance.changePreviewStyle(previewStyle);
    }

    // this looks like a bed idea to re-subscribe all the event on each re-render
    // also, note, that we had to disable this.editorInst.off(eventName);
    // otherwise popup for choosing Headings never closes
    // this.bindEventHandlers(nextProps, this.props);

    return false;
  }

  render() {
    return <div ref={this.rootEl} />;
  }
}

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
  initialValue: PropTypes.string,
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
