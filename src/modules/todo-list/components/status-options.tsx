import { StarIcon, StarIcon as StartIconSolid } from '@heroicons/react/solid';
import { useState } from 'react';


import type { Todo } from '@/stores';
import { useTodoStore } from '@/stores';

import { StatusSelectModal } from './status-select-modal';

export const StatusOptions = ({ item }: { item: Todo }) => {
  const [statusOption, setStatusOption] = useState(false);
  return (
    <div className="relative flex items-center justify-between">
      <button
        className="flex items-center gap-2 border-gray-50 text-sm text-gray-400"
        onClick={() => setStatusOption(!statusOption)}
      >
        {item.status === 'Completed' ? (
          <StartIconSolid className="size-5 text-yellow-500" />
        ) : item.status === 'In progress' ? (
          <StarIcon className="size-5 text-pink-300 " />
        ) : (
          <StarIcon className="size-5 fill-none stroke-yellow-500" />
        )}
        <p>{item?.title}</p>
      </button>

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

