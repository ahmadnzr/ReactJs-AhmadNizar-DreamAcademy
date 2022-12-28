import { postAction } from "./postAction";

const defaultState = {
  isLoading: false,
  posts: [],
  error: null,
};

export const postReducer = (state = defaultState, action) => {
  switch (action.type) {
    case postAction.SET_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case postAction.POPULATE_POST: {
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    }
    case postAction.SET_ERROR: {
      return {
        ...state,
        isLoading: false,
        posts: [],
        error: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
