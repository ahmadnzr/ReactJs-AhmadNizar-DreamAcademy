import { actionType } from "./actionType";

export const initialTodo = {
  title: "",
  isDone: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case actionType.INPUT_CHANGE: {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    }
    case actionType.RESET_VALUE: {
      return {
        title: "",
        isDone: false,
      };
    }
    case actionType.SET_TODO: {
      return action.payload;
    }

    default: {
      throw new Error("Unknown action type ", action.type);
    }
  }
}
