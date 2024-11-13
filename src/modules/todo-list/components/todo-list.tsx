"use client";
import { useTodoStore } from "@/stores";
import React from "react";
import { TodoItem } from "./todo-item";

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  return (
    <ol className="self-center w-full max-w-96 flex flex-col items-center my-6 gap-6 pb-6 relative">
      {todos && todos.length > 0 ? (
        <>
        {todos.map((item, index) => (
          <TodoItem key={index} item={item} />
         ))}
        <p className="text-zinc-600 mt-4">Don’t let things stack up, it's now or never.</p>
        </>
      ) : (
        <p className="text-zinc-600">What are you up to?</p>
      )}
    </ol>
  );
}
