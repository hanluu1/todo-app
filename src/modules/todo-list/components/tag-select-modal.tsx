import { useState } from "react";
import clsx from "clsx";
import { Todo } from "@/stores";
import { useTodoStore } from "@/stores";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { PlusCircleIcon, PencilAltIcon, BackspaceIcon } from "@heroicons/react/outline";

export const TagSelectModal = ({ data, isOpen, onClose }: { data: Todo; isOpen: boolean; onClose: () => void }) => {
  const [showForm, setShowForm] = useState(false);
  const [tagTitle, setTagTitle] = useState("");
  const [tagColor, setTagColor] = useState("#ffc0cb");

  const tags = useTodoStore((state) => state.tags);
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
            <div className="flex flex-col p-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
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
                <div className="flex flex-col">
                  <PlusCircleIcon
                    className="flex-shrink-0 w-5 h-5 text-black cursor-pointer"
                    onClick={() => {
                      setShowForm(true);
                    }}
                  />
                  <PencilAltIcon className="flex-shrink-0 w-5 h-5 text-sky-400 cursor-pointer" />
                  <BackspaceIcon className="flex-shrink-0 w-5 h-5 text-red-600 cursor-pointer" />
                </div>
                {/*form to create new tag  */}
                {showForm && (
                  <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <h3 className="text-lg text-black font-medium">Input new tag</h3>
                    <div className="flex flex-row">
                      <input
                        type="text"
                        value={tagTitle}
                        onChange={(e) => setTagTitle(e.target.value)}
                        placeholder="Tag Title"
                        className="mt-2 w-full text-black p-2 border rounded"
                      />
                      <input
                        type="color"
                        value={tagColor}
                        onChange={(e) => setTagColor(e.target.value)}
                        className="mt-2 p-2 border rounded"
                      />
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={() => {
                          if (tagTitle.trim()) {
                            useTodoStore.getState().addTag({ title: tagTitle, color: tagColor });
                            setShowForm(false);
                            setTagTitle("");
                            setTagColor("#ffc0cb");
                          }
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-300 rounded"
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
