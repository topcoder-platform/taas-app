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
      <PageHeader title={<div styleName="title">Let’s find you great talent</div>} />
      <p>
        You can search for your perfect talent matches in 3 unique ways:
      </p>
      <div styleName="landing-box-container">
        <LandingBox
          showGap 
          title="Search by Role"
          description={"Examples:\n Search “Front-End Developer”\n or “UI Designer”"}
          icon={<IconMultipleActionsCheck />}
          backgroundImage="linear-gradient(101.95deg, #8B41B0 0%, #EF476F 100%)"
          onClick={() => goToRoute("/taas/createnewteam/role")}
        />
        <LandingBox
          showGap 
          title="Search by Skills"
          description={"Examples: \nJava, Python, React, Sketch"}
          icon={<IconListQuill />}
          backgroundImage="linear-gradient(221.5deg, #2C95D7 0%, #9D41C9 100%)"
          onClick={() => goToRoute("/taas/createnewteam/skills")}
        />
        <LandingBox
          title="Describe the Work"
          description={"Provide a short description of talent\n you want or project work you’re \nlooking to do"}
          icon={<IconOfficeFileText />}
          backgroundImage="linear-gradient(135deg, #2984BD 0%, #0AB88A 100%)"
          onClick={() => goToRoute("/taas/createnewteam/jd")}
        />


      </div>
    </Page>
  );
}

export default CreateNewTeam;
