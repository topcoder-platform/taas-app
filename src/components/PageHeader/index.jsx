/**
 * PageHeader
 *
 * Shows page header with optional back arrow.
 */
import React from "react";
import PT from "prop-types";
import { Link } from "@reach/router";
import IconArrowLeft from "../../assets/images/icon-arrow-left.svg";
import "./styles.module.scss";

const PageHeader = ({ title, backTo }) => {
  return (
    <header styleName="header">
      {backTo && (
        <div styleName="back-to">
          <Link to={backTo}>
            <IconArrowLeft />
          </Link>
        </div>
      )}
      <h1 styleName="title">{title}</h1>
    </header>
  );
};

PageHeader.propTypes = {
  title: PT.string,
  backTo: PT.string,
};

export default PageHeader;
