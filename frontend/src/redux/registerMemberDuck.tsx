import axios from "axios";

export const START_REGISTER_MEMBER = "START_REGISTER_MEMBER";
export const SUCCESS_REGISTER_MEMBER = "SUCCESS_REGISTER_MEMBER";
export const FAIL_REGISTER_MEMBER = "FAIL_REGISTER_MEMBER";
export const FINISH_REGISTER_MEMBER = "FINISH_REGISTER_MEMBER";

// create actions
export const startRegisterMember = () => {
  return {
    type: START_REGISTER_MEMBER,
  };
};

export interface Action {
  type: string;
  payload: any;
}

export interface MemberInput {
  name: string;
  street: string;
  city: string;
  zipcode: string;
}

export const successRegsiterMember = (data: any) => {
  return {
    type: SUCCESS_REGISTER_MEMBER,
    payload: data,
  };
};

export const failRegisterMember = (errorMessage: string) => {
  return {
    type: FAIL_REGISTER_MEMBER,
    payload: errorMessage,
  };
};

export const finishRegisterMember = () => {
  return {
    type: FINISH_REGISTER_MEMBER,
  };
};

// create action creators
export const postMemberToRegister = ({
  name,
  street,
  city,
  zipcode,
}: MemberInput) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await axios.post("http://localhost:8080/api/members", {
        name,
        street,
        city,
        zipcode,
      });

      dispatch(successRegsiterMember(response));
    } catch (error) {
      dispatch(failRegisterMember(error.message));
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
  isSubmit: false,
  error: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case START_REGISTER_MEMBER:
      return state;
    case SUCCESS_REGISTER_MEMBER:
      return {
        data: {
          ...initialState.data,
        },
        isSubmit: true,
        error: null,
      };
    case FAIL_REGISTER_MEMBER:
      return {
        ...initialState,
        isSubmit: true,
        error: action.payload,
      };
    case FINISH_REGISTER_MEMBER:
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
