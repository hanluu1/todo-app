import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useState } from 'react';

import { type Todo, useTodoStore } from '@/stores';

export const TagSelectModal = ({ data, isOpen, onClose }: { data: Todo; isOpen: boolean; onClose: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [tagTitle, setTagTitle] = useState('');
  const [tagColor, setTagColor] = useState('#ffc0cb');

  const tags = useTodoStore((state) => state.tags);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
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
            <div className="flex flex-col p-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      className={clsx(
                        'rounded-full px-4 py-1 text-white',
                        data.tags?.find((item) => item.title === tag.title) ? 'underline' : '',
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
                <div className="flex flex-col">
                  <PlusCircleIcon
                    className="size-5 shrink-0 cursor-pointer text-black"
                    onClick={() => {
                      setShowForm(true);
                    }}
                  />
                </div>
                {/* form to create new tag  */}
                {showForm && (
                  <div className="mt-4 rounded-lg bg-white p-4 shadow-md">
                    <h3 className="text-lg font-medium text-black">Input new tag</h3>
                    <div className="flex flex-row">
                      <input
                        type="text"
                        value={tagTitle}
                        onChange={(e) => setTagTitle(e.target.value)}
                        placeholder="Tag Title"
                        className="mt-2 w-full rounded border p-2 text-black"
                      />
                      <input
                        type="color"
                        value={tagColor}
                        onChange={(e) => setTagColor(e.target.value)}
                        className="mt-2 rounded border p-2"
                      />
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        className="rounded bg-blue-500 px-4 py-2 text-white"
                        onClick={() => {
                          if (tagTitle.trim()) {
                            useTodoStore.getState().addTag({ title: tagTitle, color: tagColor });
                            setShowForm(false);
                            setTagTitle('');
                            setTagColor('#ffc0cb');
                          }
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="rounded bg-gray-300 px-4 py-2"
                        onClick={() => setShowForm(false)} // Close form without saving
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
