import { useMemo } from 'react';

import { useTodoStore } from '@/stores';

import { TodoItem } from './todo-item';
import { Form } from '@/modules/home';

export const TodoList = ({ status, }: { status: string }) => {
  const todos = useTodoStore((state) => state.todos);
  const displayList = useMemo(
    () => todos.filter((item) => (status ? item.status === status : !item.status)),
    [todos, status],
  );
  
  return (
    <div className="relative flex w-full flex-col py-3  ">
      <div className="flex max-w-28 justify-center rounded-xl bg-white shadow-sm p-2 text-base font-bold text-black">
        {status || 'To Do' }
      </div>
      <ol className="flex w-full flex-col items-start gap-4 self-center pt-3">
        {todos && todos.length > 0 ? (
          <>
            {displayList.map((item, index) => (
              <TodoItem key={index} item={item} />
            ))}
          </>
        ) : (
          <p className="text-zinc-600">Oops add more here</p>
        )}
      </ol>
      {!status && <Form />}
    </div>
  );
};
