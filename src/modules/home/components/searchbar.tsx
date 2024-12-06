import { SearchIcon } from '@heroicons/react/outline';
import React from 'react';

export function SearchBar({
  searchString,
  setSearchString,
}: {
  searchString: string;
  setSearchString: (query: string) => void;
}) {
  return (
    <div className=" flex h-10 w-full max-w-96 items-center gap-2 self-center">
      <label htmlFor="todo" className="w-[90%] text-gray-700 ">
        <input
          className="h-10 w-full rounded-md p-4 dark:bg-gray-600 dark:text-white "
          type="text"
          placeholder="Search Task"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </label>
      
      <button className="flex h-10 w-[10%] items-center justify-center rounded-lg  bg-orange-100 dark:bg-slate-500" >
    
        <SearchIcon className="w-5 text-black dark:text-white" />
      </button>
    </div>
  );
}
