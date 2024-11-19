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
        .addTodo({ title: inputText, id: self.crypto.randomUUID(), is_completed: false, tags: [] });
      setInputText('');
    }
  };

  return (
    <div className="mt-9 flex w-full max-w-96 items-center gap-3 self-center">
      <label htmlFor="todo" className="w-[90%] text-gray-700 ">
        <input
          className="h-12 w-full rounded-md p-4 "
          type="text"
          name="todo"
          id="todo"
          placeholder="Write your next task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              _onSubmit();
            }
          }}
        />
      </label>
      <button className="flex h-12 w-[10%] items-center justify-center rounded-lg border border-black" onClick={_onSubmit}>
        <PlusIcon className="w-5 text-black" />
      </button>
    </div>
  );
}
