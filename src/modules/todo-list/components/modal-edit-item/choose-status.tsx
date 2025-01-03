import { useTodoStore } from '@/stores';
import { useState } from 'react';
import type { Todo } from '@/stores';
import { Battery0Icon, Battery100Icon, Battery50Icon } from '@heroicons/react/16/solid';
import { Button } from '@/components/base';

export const ChooseStatus = ({ data }: { data: Todo }) => {
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const [statusOption, setStatusOption] = useState(false);
  const status = useTodoStore((state) => state.status);
 
  return (
    <div className="relative flex items-center gap-2">
      <p>Status:</p>
      <Button color={data.status === 'Completed' 
                          ? 'green'
                          : data.status === 'In progress' 
                          ? 'blue' 
                          : 'red' 
                }
              className="flex size-9 items-center justify-center gap-2 rounded-xl border-gray-50  dark:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setStatusOption(!statusOption)}}
        >
        {data.status === 'Completed' ? (
          <Battery100Icon className="size-5 text-white" />
        ) : data.status === 'In progress' ? (
          <Battery50Icon className="size-5 text-white" />
        ) : (
          <Battery0Icon className="size-5 text-white" />
        )}
        
      </Button>
      {statusOption && (
        <div className="flex mt-2  border border-gray-300 rounded-lg shadow-lg gap-2">
              {status.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    useTodoStore.getState().updateTodo(data.id, { status });
                    setStatusOption(false);
                  }}
                  className="block w-full px-2 py-2 text-left hover:bg-gray-200"
                >
                  {status === 'Completed' ? (
                    <Battery100Icon className=" w-7 h-7 bg-green-500 rounded-xl p-1 text-white" />
                    ) : status === 'In progress' ? (
                    <Battery50Icon className="w-7 h-7 bg-blue-400 rounded-xl p-1 text-white" />
                    ) : (
                    <Battery0Icon className="size-5 bg-red-500 text-white" />
                  )}
                </button>
              ))}
        </div>
      )}
    </div>
  );
};
