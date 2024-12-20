import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useState } from 'react';

import type { Todo } from '@/stores';
import { useTodoStore } from '@/stores';

export const TitleEditSection = ({ data, onClose }: { data: Todo; onClose: () => void }) => {
  const [inputText, setInputText] = useState(data.title);
  return (
    <div className="flex w-full items-center gap-2">
      <input
        type="text"
        name="edit-todo"
        id="edit-todo"
        defaultValue={data?.title}
        onChange={(e) => setInputText(e.target.value)}
        className="flex-1 rounded border border-gray-200 bg-white p-2 text-[16px] text-red-300 outline-transparent"
      />
      <CheckIcon
        className="w-5 cursor-pointer text-green-500"
        onClick={() => {
          useTodoStore.getState().updateTodo(data.id, { title: inputText });
          onClose();
        }}
      />
      <XIcon className="w-5 cursor-pointer text-red-500" onClick={() => setInputText(data.title)} />
    </div>
  );
};
