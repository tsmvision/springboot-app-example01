import axios from "axios";

export const START_UPDATE_BOOK = "START_UPDATE_BOOK";
export const SUCCESS_UPDATE_BOOK = "SUCCESS_UPDATE_BOOK";
export const FAIL_UPDATE_BOOK = "FAIL_UPDATE_BOOK";
export const FINISH_UPDATE_BOOK = "FINISH_UPDATE_BOOK";

// create actions
export const startUpdateBook = () => {
  return {
    type: START_UPDATE_BOOK,
  };
};

export interface Action {
  type: string;
  payload: any;
}

export interface BookInput {
  id?: number;
  name: string;
  price: number;
  stockQuantity: number;
  author: string;
  isbn: string;
}

export const successUpdateBook = (data: any) => {
  return {
    type: SUCCESS_UPDATE_BOOK,
    payload: data,
  };
};

export const failUpdateBook = (errorMessage: string) => {
  return {
    type: FAIL_UPDATE_BOOK,
    payload: errorMessage,
  };
};

export const finishUpdateBook = () => {
  return {
    type: FINISH_UPDATE_BOOK,
  };
};

// create action creators
export const updateBook = ({
  id,
  name,
  price,
  stockQuantity,
  author,
  isbn,
}: BookInput) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await axios.put("http://localhost:8080/api/items/books", {
        id,
        name,
        price,
        stockQuantity,
        author,
        isbn
      });

      dispatch(successUpdateBook(response));
    } catch (error) {
      dispatch(failUpdateBook(error.message));
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
    case START_UPDATE_BOOK:
      return state;
    case SUCCESS_UPDATE_BOOK:
      return {
        data: {
          ...initialState.data,
        },
        isSubmit: true,
        error: null,
      };
    case FAIL_UPDATE_BOOK:
      return {
        ...initialState,
        isSubmit: true,
        error: action.payload,
      };
    case FINISH_UPDATE_BOOK:
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
