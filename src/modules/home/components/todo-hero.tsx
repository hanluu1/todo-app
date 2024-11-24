import React from 'react';
import {Form} from './form'
import { SearchBar } from './searchbar';
import { useState } from 'react';

export function TodoHero({ todosCompleted, totalTodos }: { todosCompleted: number; totalTodos: number }) {
 

  return (
    <section className="flex w-full gap-10 rounded-xl pt-3 pb-5">
      <Form/>
      <SearchBar/>
      <div className="flex w-96 items-center justify-between bg-pink-300 rounded-lg gap-2 pl-2 pr-2">
        <p className="text-sm font-semibold text-current">Task Complete</p>
        <div className="flex text-black bg-white border border-white text-sm h-7 w-7 items-center justify-center rounded-full ">
        {todosCompleted}/{totalTodos}
        </div>
      </div>
      
    </section>
  );
}
