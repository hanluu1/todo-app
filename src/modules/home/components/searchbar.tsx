

import React, { useState } from 'react';

import { SearchIcon } from '@heroicons/react/outline';
import { useTodoStore } from '@/stores';
export function SearchBar({ setSearchQuery }: { setSearchQuery: (query: string) => void }) {
 
  

  return (
    <div className=" flex h-10 w-full max-w-96 items-center gap-2 self-center">
      <label htmlFor="todo" className="w-[90%] text-gray-700 ">
        <input
          className="h-10 w-full rounded-md p-4 "
          type="text"
          placeholder="Search Task"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </label>
      
      <button className="flex h-10 w-[10%] items-center justify-center rounded-lg  bg-orange-100" 
      type="button">
        <SearchIcon className="w-5 text-black" />
      </button>
    </div>
  );
}
