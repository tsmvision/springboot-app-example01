import axios from "axios";

export const START_GET_BOOK_LIST = "START_GET_BOOK_LIST";
export const SUCCESS_GET_BOOK_LIST = "SUCCESS_GET_BOOK_LIST";
export const FAIL_GET_BOOK_LIST = "FAIL_GET_BOOK_LIST";
export const FINISH_GET_BOOK_LIST = "FINISH_GET_BOOK_LIST";

// create actions
export const startGetBookList = () => {
  return {
    type: START_GET_BOOK_LIST,
  };
};

export interface Action {
  type: string;
  payload: any;
}

export interface Book {
  name: string;
  street: string;
  city: string;
  zipcode: string;
}

export const successGetBookList = (data: any) => {
  return {
    type: SUCCESS_GET_BOOK_LIST,
    payload: data,
  };
};

export const failGetBookList = (errorMessage: string) => {
  return {
    type: FAIL_GET_BOOK_LIST,
    payload: errorMessage,
  };
};

export const finishGetBookList = () => {
  return {
    type: FINISH_GET_BOOK_LIST,
  };
};

// create action creators
export const getBookList = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await axios.get("http://localhost:8080/api/items/books");
      dispatch(successGetBookList(response.data));
    } catch (error) {
      dispatch(failGetBookList(error.message));
    }
  };
};

// reducer

const initialState = {
  data: [],
  isSubmit: false,
  error: null,
};

interface State {
  data: Book[] | [];
  isSubmit: boolean;
  error: string | null;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case START_GET_BOOK_LIST:
      return state;
    case SUCCESS_GET_BOOK_LIST:
      return {
        data: [...action.payload],
        isSubmit: true,
        error: null,
      };
    case FAIL_GET_BOOK_LIST:
      return {
        ...initialState,
        isSubmit: true,
        error: action.payload,
      };
    case FAIL_GET_BOOK_LIST:
      return {
        ...initialState,
        data: [...initialState.data],
      };
    default:
      return state;
  }
};
