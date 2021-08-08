import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  authReducers,
  howToReducers,
  contactUsReducers,
  homeTabsReducers,
  propertyReducers,
  searchPropertyReducers,
} from "./reducers";

const rootReducer = combineReducers({
  authReducers,
  howToReducers,
  contactUsReducers,
  homeTabsReducers,
  propertyReducers,
  searchPropertyReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
