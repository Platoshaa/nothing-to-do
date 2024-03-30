import { createSlice } from "@reduxjs/toolkit";
import { taskAPI } from "../../api";
const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
  },
});
export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;
export const asyncCreateNewTask = (name, skillId) => {
  return (dispatch) => {
    dispatch(setTasks([]));
    taskAPI.addTask(name, skillId).then((r) => {
      if (r) {
        dispatch(setTasks(r));
      }
    });
  };
};
export const asyncDeleteTask = (id) => {
  return (dispatch) => {
    dispatch(setTasks([]));
    taskAPI.deleteTask(id).then((r) => {
      if (r) {
        dispatch(setTasks(r));
      }
    });
  };
};
export const asyncGetAllTasks = () => {
  return (dispatch) => {
    taskAPI.getAllTasks().then((r) => {
      if (r) {
        dispatch(setTasks(r));
      }
    });
  };
};

export const asyncСompleteTask = (id) => {
  let d = Date.now();

  return (dispatch) => {
    dispatch(setTasks([]));
    console.log(id, d);
    taskAPI.completeTask(id, d).then((r) => {
      dispatch(setTasks(r));
    });
  };
};
