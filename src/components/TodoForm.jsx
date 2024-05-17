import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;

    // old syntax but clearer,
    // BTW todo 'here' is the textContent of a todo
    addTodo({ todo: todo, completed: false });

    // new syntax but tougher
    // addTodo({ todo, completed: false });

    setTodo(""); //clear the input field
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Enter task here..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white-xxl shrink-0"
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
