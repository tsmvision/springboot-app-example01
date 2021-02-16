import { combineReducers } from "redux";
import registerMember from "./registerMemberDuck";
import memberList from "./memberListDuck";
import registerBook from './book/registerBookDuck';
import bookList from './book/bookListDuck';
import updateBook from './book/updateBookDuck';

export default combineReducers({ registerMember, memberList, registerBook, bookList, updateBook });
