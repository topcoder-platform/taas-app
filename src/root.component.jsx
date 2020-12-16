import React from "react";
import { Router } from "@reach/router";
import MyTeamsList from "./routes/MyTeamsList";
import MyTeamsDetails from "./routes/MyTeamsDetails";
import PositionDetails from "./routes/PositionDetails";
import "./styles/main.module.scss";

export default function Root() {
  return (
    <div styleName="topcoder-micro-frontends-teams-app">
      <Router>
        <MyTeamsList path="/taas/myteams" />
        <MyTeamsDetails path="/taas/myteams/:teamId" />
        <PositionDetails path="/taas/myteams/:teamId/positions/:positionId" />
      </Router>
    </div>
  );
}
