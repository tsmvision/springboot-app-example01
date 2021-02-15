import { combineReducers } from "redux";
import registerMember from "./registerMemberDuck";
import memberList from "./memberListDuck";
import registerBook from './registerBookDuck';

export default combineReducers({ registerMember, memberList, registerBook });
