import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { CheckIcon, ExclamationIcon, PencilAltIcon, TagIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';

import { type Todo, useTodoStore } from '@/stores';

import { StatusOptions } from './status-options';
import { TagSelectModal } from './tag-select-modal';

export function TodoItem({ item }: { item: Todo }) {
  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(item.title);
  const [isOpen, setIsOpen] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [statusOption, setStatusOption] = useState(false);

  const inputRef = useRef(null);

  return (
    <li
      id={item?.id}
      className="flex w-full max-w-96 items-center justify-between bg-[#fefdf2] p-3 text-sm text-[#c2b39a]"
    >
      {editing ? (
        <div className="flex w-full items-center">
          <input
            ref={inputRef}
            type="text"
            name="edit-todo"
            id="edit-todo"
            defaultValue={item?.title}
            onChange={(e) => setInputText(e.target.value)}
            className="size-full border-0 bg-[#fefdf2] p-3 text-[16px] text-red-300 outline-transparent"
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
          <StatusOptions item={item} />
          <div className="flex items-center gap-1">
            <PencilAltIcon className="w-5 cursor-pointer" onClick={() => setEditing(true)} />
            <TrashIcon className="w-5 cursor-pointer text-red-500" onClick={() => setIsOpen(true)} />
            <TagIcon className="w-5 cursor-pointer text-blue-400" onClick={() => setShowTagModal(true)} />
          </div>

          {!!item.tags?.length && (
            <div className="flex flex-wrap gap-2 p-2">
              {item.tags.map((tag) => (
                <div
                  className="rounded-full px-4 py-1 text-yellow-100"
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
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationIcon aria-hidden="true" className="size-6 text-red-600" />
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
