import React from "react";
import { Provider } from "react-redux";
import { Router, Redirect } from "@reach/router";
import MyTeamsList from "./routes/MyTeamsList";
import MyTeamsDetails from "./routes/MyTeamsDetails";
import PositionDetails from "./routes/PositionDetails";
import ReduxToastr from "react-redux-toastr";
import store from "./store";
import "./styles/main.vendor.scss";
import styles from "./styles/main.module.scss";

export default function Root() {
  return (
    <div className={styles["topcoder-micro-frontends-teams-app"]}>
      <Provider store={store}>
        <Router>
          <Redirect from="/taas" to="/taas/myteams" exact />
          <MyTeamsList path="/taas/myteams" />
          <MyTeamsDetails path="/taas/myteams/:teamId" />
          <PositionDetails path="/taas/myteams/:teamId/positions/:positionId" />
        </Router>

        {/* Global config for Toastr popups */}
        <ReduxToastr
          timeOut={4000}
          position="bottom-left"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </Provider>
    </div>
  );
}
