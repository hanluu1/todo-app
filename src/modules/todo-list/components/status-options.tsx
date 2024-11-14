import { useState } from "react";
import { StatusSelectModal } from "./status-select-modal";
import { StarIcon as StartIconSolid, StarIcon } from "@heroicons/react/solid";
import { useTodoStore } from "@/stores";
import { Todo } from "@/stores";

export const StatusOptions = ({ item }: { item: Todo })=> {
    const [statusOption, setStatusOption] = useState(false);
    return (
        <div className="flex items-center justify-between">
            <button
              className="flex items-center r border-gray-50 text-[#3c4049] gap-2 text-sm "
              onClick={() => setStatusOption(!statusOption)}
            >
              {item.status === "Completed" ? (
                <StartIconSolid className="w-5 h-5 text-yellow-500" />
              ) : item.status === "In progress" ? (
                <StarIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <StarIcon className="w-5 h-5 text-gray-500" />
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
                  if (value === "Completed" && item.status !== "Completed") {
                    useTodoStore.getState().completeTodo(item.id); // Mark the task as completed
                  }
                }}
              />
            )}
        </div>
    )

    
}