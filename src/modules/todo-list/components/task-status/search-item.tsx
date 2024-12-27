import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import React from 'react';

export function SearchBar({
  searchString,
  setSearchString,
}: {
  searchString: string;
  setSearchString: (query: string) => void;
}) {
  return (
    <div className=" flex w-full rounded-lg shadow-lg max-w-96 items-center gap-2 self-center dark:bg-gray-600">
      <label htmlFor="todo" className="w-[90%] text-gray-700 ">
        <input
          className="h-10 w-full rounded-md p-4 dark:bg-gray-600 dark:text-white "
          type="text"
          placeholder="Search Task"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </label>
      
      <MagnifyingGlassIcon className="flex w-5 cursor-pointer items-center justify-center rounded-3xl  text-black dark:text-white " />
      
    </div>
  );
}
