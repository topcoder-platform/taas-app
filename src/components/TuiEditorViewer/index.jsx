/*
 * TuiEditorViewer
 */
import React from "react";
import PropTypes from "prop-types";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

class TuiViewer extends React.Component {
  constructor(props) {
    super(props);
    this.rootEl = React.createRef();
    this.viewerInst = null;
  }

  getRootElement() {
    return this.rootEl.current;
  }

  getInstance() {
    return this.viewerInst;
  }

  bindEventHandlers(props) {
    Object.keys(this.props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .forEach((key) => {
        const eventName = key[2].toLowerCase() + key.slice(3);
        // off function has issue
        // when add `onFocus` function, the headings popup will not hide automatically
        // this.editorInst.off(eventName, props[key]);
        this.viewerInst.on(eventName, props[key]);
      });
  }

  componentDidMount() {
    this.viewerInst = new Viewer({
      el: this.rootEl.current,
      ...this.props,
    });

    this.bindEventHandlers(this.props);
  }

  componentWillUnmount() {
    Object.keys(this.props)
    .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
    .forEach((key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);
      this.editorInst.off(eventName);
    });
  }

  shouldComponentUpdate(nextProps) {
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

TuiViewer.propTypes = {
  initialValue: PropTypes.string,
};

export default TuiViewer;
