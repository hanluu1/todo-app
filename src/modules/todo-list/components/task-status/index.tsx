'use client';

import React, { useMemo, useState } from 'react';

import { SearchBar } from './search-item';
import { useTodoStore } from '@/stores';

import { StatusFilter } from './status-filter';
import { FilterBar } from './filter-bar';

export function TodoListRows() {
  const { searchString, setSearchString} = useSearchTodo();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  return (
    <div className="flex flex-col mx-10">
      <div className="flex w-full gap-10 rounded-xl pb-5 pt-3">
        <SearchBar searchString={searchString} setSearchString={setSearchString} />
        <FilterBar selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
        
      </div>
      <StatusFilter
        selectedStatus={selectedStatus}
        searchString={searchString}
      />    
      </div>
  );
}

const useSearchTodo = () => {
  const [searchString, setSearchString] = useState('');
  const todos = useTodoStore((state) => state.todos);

  const filteredTodos = useMemo(() => todos.filter((todo) => todo.title.includes(searchString)), [todos, searchString]);

  return { searchString, setSearchString, filteredTodos };
};
