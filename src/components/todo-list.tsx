"use client";
import { Todo, useTodoStore } from "@/stores";
import React, { useEffect, useRef } from "react";

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  return (
    <ol className="self-center w-full max-w-96 flex flex-col items-center my-6 gap-6">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => <Item key={index} item={item} />)
      ) : (
        <p className="text-zinc-600">I feel empty, give me some tasks</p>
      )}
    </ol>
  );
}

function Item({ item }: { item: Todo }) {
  const [editing, setEditing] = React.useState(false);
  const [inputText, setInputText] = React.useState(item.title);
  const inputRef = useRef(null);
  

  const handleEdit = () => {
    setEditing(true);
    setInputText(item.title);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      //inputRef.current.focus();
      // Position the cursor at the end of the text
      //inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
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
    // setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === item.id ? { ...todo, title: e.target.value } : todo)));

  }
  return (
    <li
      id={item?.id}
      className="flex justify-between items-center h-12 w-full max-w-96 text-sm bg-[#fefdf2] text-[#c2b39a] p-3"
    >
      {editing ? (
        <div className="flex items-center w-full" onSubmit={handleInputSubmit}>
          <input
            ref={inputRef}
            type="text"
            name="edit-todo"
            id="edit-todo"
            defaultValue={item?.title}
            onBlur={handleInputBlur}
            onChange={() => useTodoStore.getState().completeTodo(item.id)}
            className="h-full w-full border-0 outline-transparent text-[16px] bg-[#fefdf2] text-[#c2b39a] p-3"
          />
          <button >
            <span className="absolute overflow-hidden whitespace-nowrap h-[1px] w-[1px]"
            style={{ clip: "rect(1px, 1px, 1px, 1px)" }}
            
            >update
            </span>
          <svg xmlns="http://www.w3.org/2000/svg" 
               width="20" 
               height="20" 
               fill="currentColor" 
               className="bi bi-check2" 
               viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
          </svg>
          </button>
          <button>
            <span className="absolute overflow-hidden whitespace-nowrap h-[1px] w-[1px]"
            style={{ clip: "rect(1px, 1px, 1px, 1px)" }}
            >
              cancel
              </span>
            <svg xmlns="http://www.w3.org/2000/svg" 
                 width="16" 
                 height="16" 
                 fill="currentColor" 
                 className="bi bi-x-lg" 
                 viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>
            
          </button>
        </div>
      ) : (
        <>
          <button
            className="flex items-center border border-gray-50 text-[#3c4049] gap-2 text-sm "
            onClick={() => useTodoStore.getState().completeTodo(item.id)}
          >
            <svg fill={item.is_completed ? "gray" : "transparent"} width="24" height="24" viewBox="0 0 24 24">
              <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" stroke="gray" />
            </svg>
            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>{item?.title}</p>
          </button>
          <div className="flex items-center gap-1">
            <button onClick={handleEdit}>
              <span
                className="absolute overflow-hidden whitespace-nowrap h-[1px] w-[1px]"
                style={{ clip: "rect(1px, 1px, 1px, 1px)" }}
              >
                Edit
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
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
            <button onClick={() => useTodoStore.getState().deleteTodo(item.id)}>
              <span
                className="absolute overflow-hidden whitespace-nowrap h-[1px] w-[1px]"
                style={{ clip: "rect(1px, 1px, 1px, 1px)" }}
              >
                Delete
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
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
