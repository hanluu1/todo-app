import { useState } from "react";
import { Todo } from "@/stores";
import { useTodoStore } from "@/stores";
import { useEffect } from "react";


export const StatusSelectModal = ({ todo, isOpen, onClose, onStatusChange }: {todo: Todo, isOpen: boolean, onClose: ()=>void, onStatusChange: ()=>void}) => {
    
  if (!isOpen) return null;
  const [statusOption, setStatusOption] = useState(false);
  const handleStatus = () => {
    setStatusOption(false);
      };


   return (
        <div className="absolute right-[100%] ml-2 bg-white border border-gray-200 rounded shadow-md z-10 p-2 w-40 text-center">
          <button
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            onClick={() => handleStatus()}
          >
            Not Started
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            onClick={() => handleStatus()}
          >
            In Progress
          </button>
          <button
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            onClick={() => handleStatus()}
          >
            Completed
          </button>
        </div>

   )
    




}