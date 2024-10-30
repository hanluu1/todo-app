"use client";
import { Todo, useTodoStore } from "@/stores";
import React, { useRef, useState } from "react";
import { ExclamationCircleIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

import clsx from "clsx";

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  return (
    <ol className="self-center w-full max-w-96 flex flex-col items-center my-6 gap-6">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => <Item key={index} item={item} />)
      ) : (
        <p className="text-zinc-600">I feel empty, give me some tasks</p>
      )}
    </ol>
  );
}

function Item({ item }: { item: Todo }) {
  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(item.title);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  const handleInputSubmit = (event) => {
    event.preventDefault();

    setEditing(false);
  };

  return (
    <li
      id={item?.id}
      className="flex justify-between items-center h-12 w-full max-w-96 text-sm bg-[#fefdf2] text-[#c2b39a] p-3"
    >
      {editing ? (
        <div className="flex items-center w-full" onSubmit={handleInputSubmit}>
          <input
            ref={inputRef}
            type="text"
            name="edit-todo"
            id="edit-todo"
            defaultValue={item?.title}
            onChange={(e) => setInputText(e.target.value)}
            className="h-full w-full border-0 outline-transparent text-[16px] bg-[#fefdf2] text-[#c2b39a] p-3"
          />
          <button
            onClick={() => {
              useTodoStore.getState().updateTodo(item.id, inputText);
              setEditing(false);
            }}
          >
            <span
              className="absolute overflow-hidden whitespace-nowrap h-[1px] w-[1px]"
              style={{ clip: "rect(1px, 1px, 1px, 1px)" }}
            >
              update
            </span>
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setInputText(item.title);
            }}
          >
            <span
              className="absolute overflow-hidden whitespace-nowrap h-[1px] w-[1px]"
              style={{ clip: "rect(1px, 1px, 1px, 1px)" }}
            >
              cancel
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </button>
        </div>
      ) : (
        <>
          <button
            className="flex items-center border border-gray-50 text-[#3c4049] gap-2 text-sm "
            onClick={() => useTodoStore.getState().completeTodo(item.id)}
          >
            <div
              className={clsx("w-5 h-5 rounded-full", item.is_completed ? "bg-gray-500" : "border border-gray-500")}
            />
            <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>{item?.title}</p>
          </button>
          <div className="flex items-center gap-1">
            <PencilAltIcon className="w-5 cursor-pointer" onClick={() => setEditing(true)} />
            <TrashIcon className="w-5 text-red-500 cursor-pointer" onClick={() => setIsOpen(true)} />
          </div>
        </>
      )}
      <Dialog open={isOpen} onClose={setIsOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationCircleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Deactivate account
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to deactivate your account? All of your data will be permanently removed.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    useTodoStore.getState().deleteTodo(item.id);
                    setIsOpen(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Delete
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setIsOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </li>
  );
}
