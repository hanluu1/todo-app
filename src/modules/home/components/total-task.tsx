import React from 'react';

import { useTodoStore } from '@/stores';

export function TotalTask() {
  const todos = useTodoStore((state) => state.todos);

  const todosCompleted = todos.filter((todos) => todos.is_completed === true).length;
  const totalTodos = todos.length;

  return (
    <div className="flex w-96 items-center justify-between gap-2 rounded-lg bg-pink-300 px-2">
      <p className="text-sm font-semibold text-current">Task Complete</p>
      <div className="flex size-7 items-center justify-center rounded-full border border-white bg-white text-sm text-black ">
        {todosCompleted}/{totalTodos}
      </div>
    </div>
  );
}
