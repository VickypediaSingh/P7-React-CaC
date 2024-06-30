import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  // Function to add a new todo item
  const addTodo = (todo) => {
    // Update the state using the setTodos function
    setTodos((prev) =>
      // Return a new array with the new todo item at the beginning
      [
        // Create a new todo item with a unique ID using Date.now() and spread the properties of the given todo
        { id: Date.now(), ...todo },
        // Spread the previous state (prev), which is an array of todo items, to include them in the new array
        ...prev,
      ]
    );
  };

  // Function to update a specific todo item by its ID
  const updateTodo = (idOfTodoToBeUpdated, incomingTodo) => {
    // Update the state using the setTodos function
    setTodos((prev) =>
      // Map over the previous state (prev), which is an array of todo items
      prev.map((prevTodo) =>
        // Check if the current todo item's ID matches the given ID
        prevTodo.id === idOfTodoToBeUpdated
          ? // If it matches, replace the current todo item with the new todo item
            incomingTodo
          : // If it doesn't match, keep the current todo item as is
            prevTodo
      )
    );
  };

  // Function to delete a specific todo item by its ID
  const deleteTodo = (idOfTodoToBeDeleted) => {
    // Update the state using the setTodos function
    setTodos((prev) =>
      // Filter the previous state (prev), which is an array of todo items
      prev.filter(
        (todo) =>
          // Keep only the todo items whose ID does not match the given ID
          todo.id !== idOfTodoToBeDeleted
      )
    );
  };

  // Function to toggle the 'completed' status of a specific todo item by its ID
  const toggleComplete = (idOfTodoToBeToggled) => {
    // Update the state using the setTodos function
    setTodos((prev) =>
      // Map over the previous state (prev), which is an array of todo items
      prev.map((prevTodo) =>
        // Check if the current todo item's ID matches the given ID
        prevTodo.id === idOfTodoToBeToggled
          ? // If it matches, create a new object with the same properties as the current todo item
            // but toggle the 'completed' status
            { ...prevTodo, completed: !prevTodo.completed }
          : // If it doesn't match, keep the current todo item as is
            prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Tasks to be done
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
