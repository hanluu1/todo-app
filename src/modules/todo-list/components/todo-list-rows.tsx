'use client';

import React, { useMemo, useState } from 'react';

import { Form, TotalTask } from '@/modules/home';
import { SearchBar } from '@/modules/home/components/searchbar';
import { useTodoStore } from '@/stores';

import { StatusFilter } from './status-filter';
export function TodoListRows() {

  const { searchString, setSearchString} = useSearchTodo();



  return (
    <div className="flex flex-col mx-10">
      <div className="flex w-full gap-10 rounded-xl pb-5 pt-3">
        <Form />
        <SearchBar searchString={searchString} setSearchString={setSearchString} />
        <TotalTask />
      </div>

      <StatusFilter/>

    </div>
  );
}

const useSearchTodo = () => {
  const [searchString, setSearchString] = useState('');
  const todos = useTodoStore((state) => state.todos);

  const filteredTodos = useMemo(() => todos.filter((todo) => todo.title.includes(searchString)), [todos, searchString]);

  return { searchString, setSearchString, filteredTodos };
};
