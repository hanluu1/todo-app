import { useMemo } from 'react';

import { useTodoStore } from '@/stores';

import { TodoItem } from './todo-item';

export const TodoList = ({ status }: { status: string }) => {
  const todos = useTodoStore((state) => state.todos);

  const displayList = useMemo(
    () => todos.filter((item) => (status ? item.status === status : !item.status)),
    [todos, status],
  );
  return (
    <div className="flex flex-col w-full items-center py-4  ">
      <div className="w-full max-w-96 rounded-lg border border-black  p-2 text-center text-lg text-zinc-600">
        {status || 'To do'}
      </div>
      <ol className="relative my-6 flex  w-full max-w-96 flex-col items-center gap-6 self-center pb-6">
        {todos && todos.length > 0 ? (
          <>
            {displayList.map((item, index) => (
              <TodoItem key={index} item={item} />
            ))}
            <p className="mt-4 text-zinc-600"></p>
          </>
        ) : (
          <p className="text-zinc-600"></p>
        )}
      </ol>
    </div>
  );
};
