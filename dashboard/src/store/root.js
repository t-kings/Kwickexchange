import { combineReducers } from "redux";
import notification from "./reducers/notification";
import auth from "./reducers/auth";
import rates from "./reducers/rates";

const rootReducer = combineReducers({
  notification,
  auth,
  rates,
});

export default rootReducer;
