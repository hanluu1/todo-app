"use client";

import React from "react";

export function Form({setTodos}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        // reset the form
        const value = event.target.todo.value;
        setTodos((prevTodos) => [
            ...prevTodos,
            { title: value, id: self.crypto.randomUUID(), is_completed: false },
        ]);
        event.target.reset();
  };
      
      return (
        <form className="self-center w-full max-w-96 flex items-center gap-3 mt-9" onSubmit={handleSubmit}>
          <label htmlFor="todo" className="w-[90%] text-gray-700 ">
            <input className="w-full h-12 bg-red-100 rounded-md p-4 "
              type="text"
              name="todo"
              id="todo"
              placeholder="Write your next task"
            />
          </label>
          <button className="w-1/12 h-12 rounded-lg bg-orange-100 flex items-center justify-center ">
            <span className="items-center"></span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-clipboard2-plus" viewBox="0 0 16 16">
                <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z"/>
                <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"/>
                <path d="M8.5 6.5a.5.5 0 0 0-1 0V8H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V9H10a.5.5 0 0 0 0-1H8.5z"/>
            </svg>
          </button>
        </form>
      );
    }
