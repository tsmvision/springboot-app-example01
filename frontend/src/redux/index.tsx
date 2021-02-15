import { combineReducers } from "redux";
import registerMember from "./registerMemberDuck";
import memberList from "./memberListDuck";

export default combineReducers({ registerMember, memberList });
