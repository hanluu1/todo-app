import { useTodoStore } from "@/stores";

import { TodoItem } from '../todo-item';
import { TodoList } from '../todo-list';

export const StatusFilter = ({
  selectedStatus,
  searchString,
  setSearchString,
}: {
  selectedStatus: string | null;
  searchString: string;
  setSearchString: (value: string) => void;
}) => {
  const todos = useTodoStore((state) => state.todos);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.includes(searchString);
    const matchesStatus = selectedStatus ? todo.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  const showInProgress = todos.some((todo) => todo.status === "In progress");
  const showComplete = todos.some((todo) => todo.status === "Completed");
  return(
   
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
  
  )
}

