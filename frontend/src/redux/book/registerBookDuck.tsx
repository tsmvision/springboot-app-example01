import axios from "axios";

export const START_REGISTER_BOOK = "START_REGISTER_BOOK";
export const SUCCESS_REGISTER_BOOK = "SUCCESS_REGISTER_BOOK";
export const FAIL_REGISTER_BOOK = "FAIL_REGISTER_BOOK";
export const FINISH_REGISTER_BOOK = "FINISH_REGISTER_BOOK";

// create actions
export const startRegisterBook = () => {
  return {
    type: START_REGISTER_BOOK,
  };
};

export interface Action {
  type: string;
  payload: any;
}

export interface BookInput {
  name: string;
  price: number;
  stockQuantity: number;
  author: string;
  isbn: string;
}

export const successRegisterBook = (data: any) => {
  return {
    type: SUCCESS_REGISTER_BOOK,
    payload: data,
  };
};

export const failRegisterBook = (errorMessage: string) => {
  return {
    type: FAIL_REGISTER_BOOK,
    payload: errorMessage,
  };
};

export const finishRegisterBook = () => {
  return {
    type: FINISH_REGISTER_BOOK,
  };
};

// create action creators
export const postBookToRegister = ({
  name,
  price,
  stockQuantity,
  author,
  isbn,
}: BookInput) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await axios.post("http://localhost:8080/api/items/books", {
        name,
        price,
        stockQuantity,
        author,
        isbn
      });

      dispatch(successRegisterBook(response));
    } catch (error) {
      dispatch(failRegisterBook(error.message));
    }
  };
};

// reducer

const initialState = {
  data: {
    name: "",
    price: 0,
    quantity: 0,
    author: 0,
    isbn: ""
  },
  isSubmit: false,
  error: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case START_REGISTER_BOOK:
      return state;
    case SUCCESS_REGISTER_BOOK:
      return {
        data: {
          ...initialState.data,
        },
        isSubmit: true,
        error: null,
      };
    case FAIL_REGISTER_BOOK:
      return {
        ...initialState,
        isSubmit: true,
        error: action.payload,
      };
    case FINISH_REGISTER_BOOK:
      return {
        ...initialState,
        data: {
          ...initialState.data,
        },
      };
    default:
      return state;
  }
};

export default reducer;
