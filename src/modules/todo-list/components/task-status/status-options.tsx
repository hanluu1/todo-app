import {Battery0Icon, Battery50Icon, Battery100Icon} from '@heroicons/react/16/solid';
import { useState } from 'react';

import type { Todo } from '@/stores';
import { Button } from '@/components/base';


export const StatusOptions = ({ item }: { item: Todo }) => {
  const [statusOption, setStatusOption] = useState(false);
  return (
    <div className="relative flex items-center justify-between gap-2 text-black dark:text-white">
      <Button color={item.status === 'Completed' 
                    ? 'green'
                    : item.status === 'In progress' 
                    ? 'blue' 
                    : 'red' 
          }
        className="flex size-9 items-center justify-center gap-2 rounded-xl border-gray-50  dark:bg-gray-700"
        onClick={(e) => {
          e.stopPropagation();
          setStatusOption(!statusOption)}}
      >
        {item.status === 'Completed' ? (
          <Battery100Icon className="size-5 text-white" />
        ) : item.status === 'In progress' ? (
          <Battery50Icon className="size-5 text-white" />
        ) : (
          <Battery0Icon className="size-5 text-white" />
        )}
      </Button>
      <p>{item?.title}</p>
      
    </div>
  );
};
