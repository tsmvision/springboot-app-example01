import axios from "axios";

export const START_REGISTER_ORDER = "START_REGISTER_ORDER";
export const SUCCESS_REGISTER_ORDER = "SUCCESS_REGISTER_ORDER";
export const FAIL_REGISTER_ORDER = "FAIL_REGISTER_ORDER";
export const FINISH_REGISTER_ORDER = "FINISH_REGISTER_ORDER";

// create actions
export const startRegisterOrder = () => {
  return {
    type: START_REGISTER_ORDER,
  };
};

export interface Action {
  type: string;
  payload: any;
}

export interface OrderInput {
  memberId: number;
  productId: number;
  count: number;
}

export const successRegisterOrder = (data: any) => {
  return {
    type: SUCCESS_REGISTER_ORDER,
    payload: data,
  };
};

export const failRegisterOrder = (errorMessage: string) => {
  return {
    type: FAIL_REGISTER_ORDER,
    payload: errorMessage,
  };
};

export const finishRegisterOrder = () => {
  return {
    type: FINISH_REGISTER_ORDER,
  };
};

// create action creators
export const postCreateOrder = ({ memberId, productId, count }: OrderInput) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await axios.post("http://localhost:8080/api/order", {
        memberId,
        productId,
        count,
      });

      dispatch(successRegisterOrder(response));
    } catch (error) {
      dispatch(failRegisterOrder(error.message));
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
    isbn: "",
  },
  isSubmit: false,
  error: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case START_REGISTER_ORDER:
      return state;
    case SUCCESS_REGISTER_ORDER:
      return {
        data: {
          ...initialState.data,
        },
        isSubmit: true,
        error: null,
      };
    case FAIL_REGISTER_ORDER:
      return {
        ...initialState,
        isSubmit: true,
        error: action.payload,
      };
    case FINISH_REGISTER_ORDER:
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
