import { actionType } from "./actionType";

export const initialTodoList = [
  {
    id: 1,
    title: "Makan Mie Goreng",
    createdAt: new Date().getTime(),
    isDone: true,
  },
  {
    id: 2,
    title: "Makan Mie Kuah",
    createdAt: new Date().getTime(),
    isDone: false,
  },
  {
    id: 3,
    title: "Makan Bakso",
    createdAt: new Date().getTime(),
    isDone: true,
  },
];

export function todosReducer(state = initialTodoList, action) {
  switch (action.type) {
    case actionType.ADD_TODO: {
      return [
        ...state,
        {
          ...action.payload.todo,
          createdAt: new Date().getTime(),
          id: state[state.length - 1]?.id + 1 || 1,
        },
      ];
    }
    case actionType.DELETE_TODO: {
      const newTodo = state.filter((todo) => todo.id !== action.payload.todoId);
      return [...newTodo];
    }
    case actionType.EDIT_TODO: {
      const indexToEdit = state.findIndex(
        (todo) => todo.id === action.payload.todo.id
      );
      const copyTodo = state;
      copyTodo[indexToEdit] = action.payload.todo;

      return [...copyTodo];
    }
    default: {
      return state;
    }
  }
}
