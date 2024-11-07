"use client";

import { useTodoStore } from "@/stores";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";
export function Form() {
  const [inputText, setInputText] = useState("");

  const _onSubmit = () => {
    if(inputText.trim().length>0){
    useTodoStore.getState().addTodo({ title: inputText, 
                                      id: self.crypto.randomUUID(), 
                                      is_completed: false ,
                                      
                                    });
    setInputText("");
    }
  };

  return (
    <div className="self-center w-full max-w-96 flex items-center gap-3 mt-9">
      <label htmlFor="todo" className="w-[90%] text-gray-700 ">
        <input
          className="w-full h-12 rounded-md p-4 "
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
      <button className="w-[10%] h-12 rounded-lg bg-[#C4F9F6] flex items-center justify-center" onClick={_onSubmit}>
        
        <PlusIcon className="w-5 text-black"/>
      </button>
    </div>
  );
}
