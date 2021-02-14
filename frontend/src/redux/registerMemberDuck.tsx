import axios from "axios";

const START_REGISTER_MEMBER = "START_REGISTER_MEMBER";
const SUCCESS_REGISTER_MEMBER = "SUCCESS_REGISTER_MEMBER";
const FAIL_REGISTER_MEMBER = "ERROR_REGISTER_MEMBER";
const FINISH_REGISTER_MEMBER = "FINISH_REGISTER_MEMBER";

// create actions
const startRegisterMember = () => {
  return {
    type: START_REGISTER_MEMBER,
  };
};

interface Action {
  type: string;
  payload: any;
}

interface MemberInput {
  name: string;
  street: string;
  city: string;
  zipcode: string;
}

const successRegsiterMember = (data: any) => {
  return {
    type: SUCCESS_REGISTER_MEMBER,
    payload: data,
  };
};

const failRegisterMember = (errorMessage: string) => {
  return {
    type: FAIL_REGISTER_MEMBER,
    payload: errorMessage,
  };
};

const finishRegisterMember = () => {
  return {
    type: FINISH_REGISTER_MEMBER,
  };
};

// create action creators
const postMemberToRegister = (memberInput: MemberInput) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = axios.post("http://localhost:8080/api/member");
      dispatch(successRegsiterMember(response));
    } catch (error) {
      dispatch(failRegisterMember(error));
    }
  };
};

// reducer

const initialState = {
  data: {
    name: "",
    street: "",
    city: "",
    zipcode: "",
  },
  error: null,
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case START_REGISTER_MEMBER:
      return state;
    case SUCCESS_REGISTER_MEMBER:
      return {
        data: {
          ...action.payload,
        },
        error: undefined,
      };
    case FAIL_REGISTER_MEMBER:
      return {
        ...initialState,
        error: action.payload,
      };
    case FAIL_REGISTER_MEMBER:
      return state;
    default:
      return state;
  }
};
