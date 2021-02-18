/**
 * ResourceDetails
 *
 * Shows resource details like: title, start, end date, status, rate and action button for edit
 */
import React from "react";
import PT from "prop-types";
import DataItem from "components/DataItem";
import { formatDate, formatMoney } from "utils/format";
import IconMoney from "../../../assets/images/icon-money.svg";
import IconComputer from "../../../assets/images/icon-computer.svg";
import IconBag from "../../../assets/images/icon-bag.svg";
import "./styles.module.scss";

const ResourceDetails = ({ resource, jobTitle }) => {
  return (
    <div styleName="resource-details">
      <div styleName="table">
        <div styleName="table-row">
          <div styleName="table-cell">
            <DataItem
              icon={<IconComputer />}
              title="Job Title"
              children={jobTitle}
            />
          </div>
          <div styleName="table-cell">
            <DataItem
              icon={<IconBag />}
              title="Start Date"
              children={formatDate(resource.startDate)}
            />
          </div>
          <div styleName="table-cell">
            <DataItem
              icon={<IconMoney />}
              title="Client Rate"
              children={formatMoney(resource.customerRate)}
            />
          </div>
        </div>
        <div styleName="table-row">
          <div styleName="table-cell">
            <DataItem
              icon={<IconMoney />}
              title="Status"
              children={resource.status}
            />
          </div>
          <div styleName="table-cell">
            <DataItem
              icon={<IconBag />}
              title="End Date"
              children={formatDate(resource.endDate)}
            />
          </div>
          <div styleName="table-cell">
            <DataItem
              icon={<IconMoney />}
              title="Member Rate"
              children={formatMoney(resource.memberRate)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ResourceDetails.propTypes = {
  jobTitle: PT.string,
  resource: PT.shape({
    startDate: PT.string,
    endDate: PT.string,
    id: PT.string,
    status: PT.string,
    customerRate: PT.string,
    memberRate: PT.string,
    projectId: PT.string,
  }),
};

export default ResourceDetails;
