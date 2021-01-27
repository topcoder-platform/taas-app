/**
 * Page
 *
 * Handles common stuff for pages.
 * Should wrap each page.
 */
import React, { useEffect } from "react";
import PT from "prop-types";
import "./styles.module.scss";
import { formatPageTitle } from "utils/format";

const Page = ({ children, title }) => {
  // set page title and triggering analytics
  useEffect(() => {
    // we set title manually like this instead of using `react-helmet` because of the issue:
    // https://github.com/nfl/react-helmet/issues/189
    document.title = formatPageTitle(title);

    // call analytics if the parent Frame app initialized it
    if (window.analytics && typeof window.analytics.page === "function") {
      window.analytics.page();
    }
  }, [title]);

  return <div styleName="page">{children}</div>;
};

Page.propTypes = {
  children: PT.node,
  title: PT.string,
};

export default Page;
