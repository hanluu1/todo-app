"use client";
import React, { useEffect } from "react";

export function TodoList({
  todos,
  setTodos,
}: {
  todos: { id: number; title: string; is_completed: boolean }[];
  setTodos: React.Dispatch<React.SetStateAction<{ id: number; title: string; is_completed: boolean }[]>>;
}) {
  return (
    <ol className="self-center w-full max-w-96 flex flex-col items-center my-6 gap-6">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => <Item key={index} item={item} setTodos={setTodos} />)
      ) : (
        <p className="text-zinc-600">I feel empty, give me some tasks</p>
      )}
    </ol>
  );
}

function Item({ item, setTodos }) {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);

  const completeTodo = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed } // Toggle is_completed
          : todo
      )
    );
  };

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      // Position the cursor at the end of the text
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
    }
  }, [editing]);

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setEditing(false);
  };

  const handleInputBlur = () => {
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === item.id ? { ...todo, title: e.target.value } : todo)));
  };
  const inputDelete = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== item.id));
  };

  return (
    <li id={item?.id} className="todo_item">
      {editing ? (
        <form className="edit-form" onSubmit={handleInputSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button className="todo_items_left" onClick={completeTodo}>
            <svg fill={item.is_completed ? "gray" : "transparent"} width="24" height="24" viewBox="0 0 24 24">
              <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" stroke="beige" />
            </svg>
            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>{item?.title}</p>
          </button>
          <div className="todo_items_right">
            <button onClick={handleEdit}>
              <span className="visually-hidden">Edit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
            <button onClick={inputDelete}>
              <span className="visually-hidden">Delete</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
            </button>
          </div>
        </>
      )}
    </li>
  );
}
