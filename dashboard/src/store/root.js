import { combineReducers } from "redux";
import notification from "./reducers/notification";
import auth from "./reducers/auth";
import rates from "./reducers/rates";
import resources from "./reducers/resources";

const rootReducer = combineReducers({
  notification,
  auth,
  rates,
  resources,
});

export default rootReducer;
