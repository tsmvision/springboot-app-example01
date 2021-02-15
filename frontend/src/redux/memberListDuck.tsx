import axios from "axios";

export const START_GET_MEMBER_LIST = "START_GET_MEMBER_LIST";
export const SUCCESS_GET_MEMBER_LIST = "SUCCESS_GET_MEMBER_LIST";
export const FAIL_GET_MEMBER_LIST = "FAIL_GET_MEMBER_LIST";
export const FINISH_GET_MEMBER_LIST = "FINISH_GET_MEMBER_LIST";

// create actions
export const startGetMemberList = () => {
  return {
    type: START_GET_MEMBER_LIST,
  };
};

export interface Action {
  type: string;
  payload: any;
}

export interface Member {
  name: string;
  street: string;
  city: string;
  zipcode: string;
}

export const successGetMemberList = (data: any) => {
  return {
    type: SUCCESS_GET_MEMBER_LIST,
    payload: data,
  };
};

export const failGetMemberList = (errorMessage: string) => {
  return {
    type: FAIL_GET_MEMBER_LIST,
    payload: errorMessage,
  };
};

export const finishGetMemberList = () => {
  return {
    type: FINISH_GET_MEMBER_LIST,
  };
};

// create action creators
export const getMemberList = () => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await axios.get("http://localhost:8080/api/members");
      dispatch(successGetMemberList(response.data));
    } catch (error) {
      dispatch(failGetMemberList(error.message));
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
  data: Member[] | [];
  isSubmit: boolean;
  error: string | null;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case START_GET_MEMBER_LIST:
      return state;
    case SUCCESS_GET_MEMBER_LIST:
      return {
        data: [...action.payload],
        isSubmit: true,
        error: null,
      };
    case FAIL_GET_MEMBER_LIST:
      return {
        ...initialState,
        isSubmit: true,
        error: action.payload,
      };
    case FAIL_GET_MEMBER_LIST:
      return {
        ...initialState,
        data: [...initialState.data],
      };
    default:
      return state;
  }
};
