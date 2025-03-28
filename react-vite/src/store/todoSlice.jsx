import { createSlice } from "@reduxjs/toolkit";


const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("Lỗi khi lấy dữ liệu từ localStorage", e);
    return [];
  }
};


const initialState = {
  tasks: loadState(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ id: Date.now(), text: action.payload, completed: false });
      localStorage.setItem("todos", JSON.stringify(state.tasks)); 
    },
    editTask: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.text = action.payload.newText;
        localStorage.setItem("todos", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.tasks)); 
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("todos", JSON.stringify(state.tasks));
      }
    },
    moveTask: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const [movedTask] = state.tasks.splice(fromIndex, 1);
      state.tasks.splice(toIndex, 0, movedTask);
      localStorage.setItem("todos", JSON.stringify(state.tasks)); 
    },
  },
});

export const { addTask, editTask, deleteTask, toggleComplete, moveTask } = todoSlice.actions;
export default todoSlice.reducer;
