/**
 * Create Team Landing
 *
 * Landing page for creating new teams
 * by selecting a role, inputting skills,
 * or inputting a job description
 */
import React from "react";
import { useDispatch } from "react-redux";
import { navigate } from "@reach/router";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import LandingBox from "../../components/LandingBox";
import { clearMatchingRole } from "../../actions";
import IconMultipleActionsCheck from "../../../../assets/images/icon-multiple-actions-check-2.svg";
import IconListQuill from "../../../../assets/images/icon-list-quill.svg";
import IconOfficeFileText from "../../../../assets/images/icon-office-file-text.svg";
import "./styles.module.scss";

function CreateNewTeam() {
  const dispatch = useDispatch();
  const goToRoute = (path) => {
    dispatch(clearMatchingRole());
    navigate(path);
  };

  return (
    <Page title="Find your Talent">
      <PageHeader title={<div styleName="title">Find your Talent</div>} />
      <p>
        Please select how you'd like to search the Topcoder community for a
        perfect match.
      </p>
      <LandingBox
        title="Choose a Role"
        description="Select from a list of pre-defined roles which Topcoder develops talent for. Standardized Job Descriptions and baseline skills are available for review."
        icon={<IconMultipleActionsCheck />}
        backgroundImage="linear-gradient(101.95deg, #8B41B0 0%, #EF476F 100%)"
        onClick={() => goToRoute("/taas/createnewteam/role")}
      />
      <LandingBox
        title="Input Skills"
        description="Select one or more technical skills you need. Topcoder will match your requirements to our talent."
        icon={<IconListQuill />}
        backgroundImage="linear-gradient(221.5deg, #2C95D7 0%, #9D41C9 100%)"
        onClick={() => goToRoute("/taas/createnewteam/skills")}
      />
      <LandingBox
        title="Input Job Description"
        description="Input a Job Description and Topcoder will extract the required skills from it, then find the best matching talent for the job duties."
        icon={<IconOfficeFileText />}
        backgroundImage="linear-gradient(135deg, #2984BD 0%, #0AB88A 100%)"
        onClick={() => goToRoute("/taas/createnewteam/jd")}
      />
    </Page>
  );
}

export default CreateNewTeam;
