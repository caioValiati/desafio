import { combineReducers } from "redux";

import userReducer from "./auth/authSlice";
import cooperadosReducer from "./cooperados/cooperadosSlice";
import geolocationReducer from "./geolocation/geolocationSlice";

const rootReducer = combineReducers({ userReducer, cooperadosReducer, geolocationReducer });

export default rootReducer;