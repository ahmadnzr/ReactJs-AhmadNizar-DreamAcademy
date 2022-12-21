import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../store/todo/actionReducer";

export const useForm = () => {
  const [todo, setTodo] = useState({
    isForEdit: false,
    todo: {
      title: "",
      isDone: false,
    },
  });

  const dispatch = useDispatch();

  const onChangeInput = (key, value) => {
    setTodo((prev) => ({ ...prev, todo: { ...prev.todo, [key]: value } }));
  };

  const resetForm = () => {
    setTodo({
      isForEdit: false,
      todo: {
        title: "",
        isDone: false,
      },
    });
  };

  const onSubmitForm = () => {
    if (todo.isForEdit) {
      dispatch(editTodo(todo.todo));
    } else {
      dispatch(addTodo(todo.todo));
    }

    resetForm();
  };

  const onEditForm = (todo) => {
    setTodo({
      isForEdit: true,
      todo: { ...todo },
    });
  };

  return {
    todo,
    resetForm,
    onEditForm,
    onChangeInput,
    onSubmitForm,
  };
};
