import clsx from "clsx";
import { useState } from "react";
import { useTodoStore } from "@/stores";
import { useMemo } from "react";

import { TodoItem } from './todo-item';
import { TodoList } from './todo-list';

export const StatusFilter = () => {
  const todos = useTodoStore((state) => state.todos);
  const { searchString, filteredTodos } = useSearchTodo();


  const showInProgress = todos.some((todo) => todo.status === 'In progress');
  const showComplete = todos.some((todo) => todo.status === 'Completed');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); 
  return(
    <div>
    <div className="flex flex-row justify-center gap-2 ">
        <button
          className={clsx(
            'flex max-w-24 justify-center rounded-full p-2 text-sm font-bold',
            selectedStatus === '' ? 'bg-amber-50 text-black shadow-lg' : 'bg-white text-zinc-600',
          )}
          onClick={() => setSelectedStatus('')}
        >
          To Do
        </button>
        <button
          className={clsx(
            'flex max-w-24 justify-center rounded-full p-2 text-sm font-bold',
            selectedStatus === 'In progress' ? 'bg-amber-50 text-black shadow-lg' : 'bg-white text-zinc-600',
          )}
          onClick={() => setSelectedStatus('In progress')}
        >
          In Progress
        </button>
        <button
          className={clsx(
            'flex max-w-24 justify-center rounded-full p-2 text-sm font-bold',
            selectedStatus === 'Completed' ? 'bg-amber-50 text-black shadow-lg' : 'bg-white text-zinc-600',
          )}
          onClick={() => setSelectedStatus('Completed')}
        >
          Completed
        </button>
        <button
          className={clsx(
            'flex max-w-24 justify-center rounded-full p-2 text-sm font-bold',
            selectedStatus === null ? 'bg-amber-50 text-black shadow-lg' : 'bg-white text-zinc-600',
          )}
          onClick={() => setSelectedStatus(null)} 
        >
          All
        </button>
    </div>
     <div className="flex flex-col gap-3 pb-20">
     {searchString ? (
       <ol className="flex w-full flex-col items-start gap-4 self-center pt-3">
         {filteredTodos?.length > 0 ? (
           filteredTodos.map((item, index) => <TodoItem key={index} item={item} />)
         ) : (
           <p className="text-zinc-600">No task found</p>
         )}
       </ol>
     ) : (
       <>
         {selectedStatus === null && (
           <>
             <TodoList status="" />
             {showInProgress && <TodoList status="In progress" />}
             {showComplete && <TodoList status="Completed" />}
           </>
         )}
         {selectedStatus !== null && <TodoList status={selectedStatus} />}
       </>
     )}
   </div>
 </div>
  )
}

const useSearchTodo = () => {
const [searchString, setSearchString] = useState('');
const todos = useTodoStore((state) => state.todos);

const filteredTodos = useMemo(() => todos.filter((todo) => todo.title.includes(searchString)), [todos, searchString]);

return { searchString, setSearchString, filteredTodos };
};