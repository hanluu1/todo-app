'use client';

import React, { useMemo, useState } from 'react';

import { Form, TotalTask } from '@/modules/home';
import { SearchBar } from '@/modules/home/components/searchbar';
import { useTodoStore } from '@/stores';

import { TodoItem } from './todo-item';
import { TodoList } from './todo-list';

export function TodoListRows() {
  const todos = useTodoStore((state) => state.todos);

  const { searchString, setSearchString, filteredTodos } = useSearchTodo();

  const showInProgress = todos.some((todo) => todo.status === 'In progress');
  const showComplete = todos.some((todo) => todo.status === 'Completed');

  return (
    <div className="flex flex-col">
      <div className="flex w-full gap-10 rounded-xl pb-5 pt-3">
        <Form />
        <SearchBar searchString={searchString} setSearchString={setSearchString} />
        <TotalTask />
      </div>
      <div className="flex flex-col gap-3 pb-20">
        {searchString ? (
          <ol className="flex w-full flex-col items-start gap-4 self-center pt-3">
            {filteredTodos?.length > 0 ? (
              filteredTodos.map((item, index) => <TodoItem key={index} item={item} />)
            ) : (
              <p className="text-zinc-600">No task found</p>
            )}
          </ol>
        ) : (
          <>
            <TodoList status="" />
            {showInProgress && <TodoList status="In progress" />}
            {showComplete && <TodoList status="Completed" />}
          </>
        )}
      </div>
    </div>
  );
}

const useSearchTodo = () => {
  const [searchString, setSearchString] = useState('');
  const todos = useTodoStore((state) => state.todos);

  const filteredTodos = useMemo(() => todos.filter((todo) => todo.title.includes(searchString)), [todos, searchString]);

  return { searchString, setSearchString, filteredTodos };
};
