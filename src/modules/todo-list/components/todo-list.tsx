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
    <div className="relative flex flex-col w-full py-3  ">
      <div className="flex justify-center bg-white max-w-24 rounded-full border border-black p-2 text-sm font-bold text-zinc-600">
        {status || 'To do'}
        
      </div>
      <ol className="flex flex-col w-full items-start gap-4 self-center pt-3">
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
