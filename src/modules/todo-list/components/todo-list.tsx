"use client";
import { useTodoStore } from "@/stores";
import React, { useMemo } from "react";
import { TodoItem } from "./todo-item";

export function TodoList() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <List status="" />
      <List status="Ready" />
      <List status="In progress" />
      <List status="Completed" />
    </div>
  );
}

const List = ({ status }: { status: string }) => {
  const todos = useTodoStore((state) => state.todos);

  const displayList = useMemo(
    () => todos.filter((item) => (status ? item.status === status : !item.status)),
    [todos, status]
  );
  return (
    <div className="flex flex-col items-center py-4  ">
      <div className=" w-full max-w-96 bg-[#fefdf2] border-solid border-2  text-zinc-600 font-semibold text-l p-2 text-center rounded">{status || "To do"}</div>
      <ol className="self-center w-full max-w-96  flex flex-col items-center my-6 gap-6 pb-6 relative">
        {todos && todos.length > 0 ? (
          <>
            {displayList.map((item, index) => (
              <TodoItem key={index} item={item} />
            ))}
            <p className="text-zinc-600 mt-4"></p>
          </>
        ) : (
          <p className="text-zinc-600"></p>
        )}
      </ol>
    </div>
  );
};
