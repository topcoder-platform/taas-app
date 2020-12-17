/* global process */
/**
 * Configure Redux Store
 */
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";
import rootReducer from "./reducers";

const middlewares = [
  // if payload of action is promise it would split action into 3 states
  createPromise({
    promiseTypeSuffixes: ["PENDING", "SUCCESS", "ERROR"],
  }),
  thunk,
];

// enable Redux Logger in in DEV environment
if (process.env.NODE_ENV === "development") {
  const { createLogger } = require("redux-logger");
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
