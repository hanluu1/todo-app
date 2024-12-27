'use client';

import { PlusIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';

import { useTodoStore } from '@/stores';

export function Form() {
  const [inputText, setInputText] = useState('');

  const _onSubmit = () => {
    if (inputText.trim().length > 0) {
      useTodoStore
        .getState()
        .addTodo({ title: inputText, id: self.crypto.randomUUID(), is_completed: false, tags: [], status:'' });
      setInputText('');
    }
  };

  return (
    <div className=" flex w-full shadow-sm rounded-2xl bg-neutral-700/5 p-2 text-l items-center self-center dark:bg-gray-600 mt-4">
      <PlusIcon className="w-5 m-2 text-black dark:text-white" onClick={_onSubmit} />

      <label htmlFor="todo" className="w-full text-black ">
        <input
          className=" h-9 w-full rounded-md p-2 dark:bg-gray-700 dark:text-white "
          type="text"
          name="todo"
          id="todo"
          placeholder="Add Task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              _onSubmit();
            }
          }}
        />
      </label>
      
    </div>
  );
}
