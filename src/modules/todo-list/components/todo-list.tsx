import { useMemo } from 'react';

import { useTodoStore } from '@/stores';

import { TodoItem } from './todo-item';

export const TodoList = ({ status, searchQuery }: { status: string, searchQuery: string }) => {
  const todos = useTodoStore((state) => state.todos);
  const displayList = useMemo(
    () => todos.filter((item) => (status ? item.status === status : !item.status)),
    [todos, status],
  );
  //const filteredTodos = useMemo(() => {
    //return todos.filter((item) =>
    //  item.title.toLowerCase().includes(searchQuery.toLowerCase()) 
   // );
 // }, [todos, searchQuery]);

  return (
    <div className="relative flex w-full flex-col py-3  ">
      <div className="flex max-w-24 justify-center rounded-full border border-black bg-white p-2 text-sm font-bold text-zinc-600">
        {status || 'To do'}
      </div>
      <ol className="flex w-full flex-col items-start gap-4 self-center pt-3">
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
