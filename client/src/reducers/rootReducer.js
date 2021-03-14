import { combineReducers } from "redux";
import auth from "./authReduce";
import post from "./postReducer";

const rootReducer = combineReducers({ post, auth });
export default rootReducer;
