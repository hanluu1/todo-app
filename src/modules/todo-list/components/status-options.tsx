import { StarIcon, StarIcon as StartIconSolid } from '@heroicons/react/solid';
import { useState } from 'react';

import type { Todo } from '@/stores';
import { useTodoStore } from '@/stores';

import { StatusSelectModal } from './status-select-modal';

export const StatusOptions = ({ item }: { item: Todo }) => {
  const [statusOption, setStatusOption] = useState(false);
  return (
    <div className="relative flex items-center justify-between gap-2 text-black">
      <button
        className="flex size-9 items-center justify-center gap-2 rounded-xl border-gray-50 bg-neutral-700/10"
        onClick={() => setStatusOption(!statusOption)}
      >
        {item.status === 'Completed' ? (
          <StartIconSolid className="size-5 text-yellow-500" />
        ) : item.status === 'In progress' ? (
          <StarIcon className="size-5 text-pink-300 " />
        ) : (
          <StarIcon className="size-5 fill-none stroke-yellow-500" />
        )}
      </button>
      <p>{item?.title}</p>
      {statusOption && (
        <StatusSelectModal
          isOpen={statusOption}
          onClose={() => setStatusOption(false)}
          onStatusChange={(value) => {
            useTodoStore.getState().updateTodo(item.id, { status: value });
            setStatusOption(false);
            if (value === 'Completed' && item.status !== 'Completed') {
              useTodoStore.getState().completeTodo(item.id); // Mark the task as completed
            }
          }}
        />
      )}
    </div>
  );
};
