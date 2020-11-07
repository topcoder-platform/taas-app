import React from "react";
import { render } from "@testing-library/react";
import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import Root from "./root.component";

function renderWithRouter(
  ui,
  {
    route = "/taas/myteams",
    history = createHistory(createMemorySource(route)),
  } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText } = renderWithRouter(<Root />);
    expect(getByText(/MY TEAMS/i)).toBeInTheDocument();
  });
});
