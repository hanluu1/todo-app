'use client';

import { PlusIcon } from '@heroicons/react/outline';
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
    <div className=" flex  w-full max-w-96 items-center gap-3 self-center">
      <label htmlFor="todo" className="w-[90%] text-gray-700 ">
        <input
          className=" h-10 w-full rounded-md p-4 "
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
      <button className="flex h-10 w-[10%] items-center justify-center rounded-lg  bg-orange-100" onClick={_onSubmit}>
        <PlusIcon className="w-5 text-black" />
      </button>
    </div>
  );
}
