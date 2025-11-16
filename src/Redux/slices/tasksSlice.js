import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todayTasks: [
    {
      id: 1,
      text: "Finish the sales presentation",
      completed: false,
      avatars: ["👨‍💼", "👩‍💼"],
      tag: "Today",
    },
    {
      id: 2,
      text: "Send follow-up emails",
      completed: false,
      avatars: ["👨‍💼"],
      tag: "Today",
    },
  ],
  completedTasks: [
    {
      id: 3,
      text: "Attend team meeting",
      completed: true,
      avatars: ["👩‍💼"],
      tag: "Today",
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleComplete: (state, action) => {
      const taskId = action.payload;
      let task = state.todayTasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        if (task.completed) {
          state.completedTasks.push(task);
          state.todayTasks = state.todayTasks.filter((t) => t.id !== taskId);
        }
      } else {
        task = state.completedTasks.find((t) => t.id === taskId);
        if (task) {
          task.completed = !task.completed;
          if (!task.completed) {
            state.todayTasks.push(task);
            state.completedTasks = state.completedTasks.filter(
              (t) => t.id !== taskId
            );
          }
        }
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.todayTasks = state.todayTasks.filter((t) => t.id !== taskId);
      state.completedTasks = state.completedTasks.filter(
        (t) => t.id !== taskId
      );
    },
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false,
        avatars: [],
        tag: "Today",
      };
      state.todayTasks.push(newTask);
    },
  },
});

export const { toggleComplete, deleteTask, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
