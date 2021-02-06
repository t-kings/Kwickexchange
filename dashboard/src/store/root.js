import { combineReducers } from "redux";
import notification from "./reducers/notification";
import auth from "./reducers/auth";

const rootReducer = combineReducers({
  notification,
  auth,
});

export default rootReducer;
