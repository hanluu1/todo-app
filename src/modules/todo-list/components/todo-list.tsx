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
    <div className="relative flex flex-col w-full items-center py-4  ">
      <div className=" absolute -left-2 max-w-96 rounded-full border  border-black p-2 text-center text-sm text-zinc-600">
        {status || 'To do'}
        
      </div>
      <ol className="flex flex-col my-6  w-full items-start gap-6 self-center pt-10">
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
