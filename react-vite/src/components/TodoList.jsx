import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, editTask, deleteTask, toggleComplete, moveTask } from "../store/todoSlice";

const TodoList = () => {
  const tasks = useSelector((state) => state.todos.tasks);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  const handleEditTask = (id, text) => {
    setEditingTask(id);
    setEditText(text);
  };

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      dispatch(editTask({ id, newText: editText }));
      setEditingTask(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Todo List</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Thêm công việc..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Thêm
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-3 border rounded-md ${
              task.completed ? "bg-gray-100 line-through text-gray-500" : "bg-white"
            }`}
          >
            {editingTask === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className="ml-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Lưu
                </button>
              </>
            ) : (
              <>
                <span className="mr-3">{typeof task.text === "string" ? task.text : "Lỗi dữ liệu"}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTask(task.id, task.text)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => dispatch(deleteTask(task.id))}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => dispatch(toggleComplete(task.id))}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {task.completed ? "Hoàn tác" : "Hoàn thành"}
                  </button>
                  {index > 0 && (
                    <button
                      onClick={() => dispatch(moveTask({ fromIndex: index, toIndex: index - 1 }))}
                      className="px-2 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    >
                      ↑
                    </button>
                  )}
                  {index < tasks.length - 1 && (
                    <button
                      onClick={() => dispatch(moveTask({ fromIndex: index, toIndex: index + 1 }))}
                      className="px-2 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                    >
                      ↓
                    </button>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
