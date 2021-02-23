import { combineReducers } from "redux";
import notification from "./reducers/notification";
import auth from "./reducers/auth";
import rates from "./reducers/rates";
import resources from "./reducers/resources";
import trade from "./reducers/trade";

const rootReducer = combineReducers({
  notification,
  auth,
  rates,
  resources,
  trade,
});

export default rootReducer;
