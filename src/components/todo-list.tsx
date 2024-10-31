"use client";
import { Todo, useTodoStore } from "@/stores";
import React, { useRef, useState } from "react";
import { ExclamationIcon, PencilAltIcon, TrashIcon, CheckIcon, XIcon, TagIcon } from "@heroicons/react/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

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
  const [showTagModal, setShowTagModal] = useState(false);

  const inputRef = useRef(null);

  const handleInputSubmit = (event) => {
    event.preventDefault();
    setEditing(false);
  };

  return (
    <li
      id={item?.id}
      className="flex justify-between items-center w-full max-w-96 text-sm bg-[#fefdf2] text-[#c2b39a] p-3"
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
          <button>
            <CheckIcon
              className="w-5 cursor-pointer"
              onClick={() => {
                useTodoStore.getState().updateTodo(item.id, { title: inputText });
                setEditing(false);
              }}
            />
          </button>
          <button>
            <XIcon
              className="w-5 cursor-pointer"
              onClick={() => {
                setEditing(false);
                setInputText(item.title);
              }}
            />
          </button>
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
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
              <TagIcon className="w-5 text-blue-400 cursor-pointer" onClick={() => setShowTagModal(true)} />
            </div>
          </div>
          {!!item.tags?.length && (
            <div className="flex p-2 flex-wrap">
              {item.tags.map((tag) => (
                <div
                  className="px-4 text-white py-1 rounded-full"
                  key={tag.title}
                  style={{
                    backgroundColor: tag.color,
                  }}
                >
                  {tag.title}
                </div>
              ))}
            </div>
          )}
        </div>
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
                    <ExclamationIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" className="text-base text-gray-600">
                      Are you sure you want to delete this task? Action can not be undone.
                    </DialogTitle>
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
                  className="inline-flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:ml-3 sm:w-auto"
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
      <TagSelectModal data={item} isOpen={showTagModal} onClose={() => setShowTagModal(false)} />
    </li>
  );
}

const TagSelectModal = ({ data, isOpen, onClose }: { data: Todo; isOpen: boolean; onClose: () => void }) => {
  console.log("asd");
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
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
            <div className="flex p-2 flex-wrap">
              {TAG.map((tag) => (
                <button
                  className={clsx(
                    "px-4 text-white py-1 rounded-full",
                    !!data.tags?.find((item) => item.title === tag.title) ? "underline" : ""
                  )}
                  key={tag.title}
                  style={{
                    backgroundColor: tag.color,
                  }}
                  onClick={() => {
                    if (!data.tags?.find((item) => item.title === tag.title)) {
                      useTodoStore.getState().updateTodo(data.id, { tags: [...(data.tags || []), tag] });
                    } else {
                      useTodoStore
                        .getState()
                        .updateTodo(data.id, { tags: data.tags.filter((item) => item.title !== tag.title) });
                    }
                  }}
                >
                  {tag.title}
                </button>
              ))}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

const TAG = [
  {
    title: "New Tag",
    color: "#0de",
  },
  {
    title: "Workout",
    color: "#0de040",
  },
  {
    title: "Learning",
    color: "#0d8787",
  },
];
