import { actionType } from "./actionType";

export const initialTodo = {
  isForEdit: false,
  todo: {
    title: "",
    isDone: false,
  },
};

export function newTodoReducer(state, action) {
  switch (action.type) {
    case actionType.INPUT_CHANGE: {
      return {
        ...state,
        todo: {
          ...state.todo,
          [action.payload.key]: action.payload.value,
        },
      };
    }
    case actionType.RESET_VALUE: {
      return {
        isForEdit: false,
        todo: {
          title: "",
          isDone: false,
        },
      };
    }
    case actionType.SET_TODO: {
      return {
        isForEdit: true,
        todo: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
