import React from "react";
import { Router } from "@reach/router";
import MyTeamsList from "./routes/MyTeamsList";
import MyTeamsDetails from "./routes/MyTeamsDetails";
import { UserDetailsProvider } from "./hooks/useUserDetails";
import "./styles/main.module.scss";

export default function Root() {
  return (
    <UserDetailsProvider>
      <div styleName="topcoder-micro-frontends-teams-app">
        <Router>
          <MyTeamsList path="/taas/myteams" />
          <MyTeamsDetails path="/taas/myteams/:teamId" />
        </Router>
      </div>
    </UserDetailsProvider>
  );
}
