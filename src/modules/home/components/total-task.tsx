import React from 'react';

import { useTodoStore } from '@/stores';

export function TotalTask() {
  const todos = useTodoStore((state) => state.todos);

  const todosCompleted = todos.filter((todos) => todos.is_completed === true).length;
  const totalTodos = todos.length;

  return (
    <div className="flex w-96 items-center justify-between gap-2 py-2 rounded-lg bg-white text-black px-2 dark:bg-gray-600">
      <p className="text-xs text-current dark:text-white ">Task Complete</p>
      <div className="flex size-7 items-center justify-center rounded-full border border-white bg-slate-500 text-sm text-white ">
        {todosCompleted}/{totalTodos}
      </div>
    </div>
  );
}
