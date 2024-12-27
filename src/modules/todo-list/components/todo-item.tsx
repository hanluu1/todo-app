import { PencilSquareIcon, TrashIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

import { type Todo } from '@/stores';

import { DeletePanel } from './delete-panel';
import { ModalEditItem } from './modal-edit-item';
import { StatusOptions } from './task-status/status-options';

export function TodoItem({ item }: { item: Todo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  return (
    <div
      id={item?.id}
      className="flex w-full items-center justify-between rounded-2xl bg-neutral-700/5 p-2 text-l font-semibold text-orange-200 dark:bg-gray-600 "
    >
      <div className="flex w-full flex-col gap-2">
        <div
          className="flex w-full cursor-pointer flex-row items-center justify-between"
          onClick={() => setShowModalEdit(true)}
        >
          <StatusOptions item={item} />
          <div className="flex items-center gap-1 ">
            <PencilSquareIcon className="w-5 cursor-pointer" onClick={() => setShowModalEdit(true)} />
            <TrashIcon
              className="w-5 cursor-pointer text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            />
           
          </div>
        </div>
        {!!item.tags?.length && (
          <div className="flex flex-wrap gap-2 p-2">
            {item.tags.map((tag) => (
              <div
                className="rounded-full px-4 py-1 text-sm text-yellow-100"
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
      <ModalEditItem data={item} isOpen={showModalEdit} onClose={() => setShowModalEdit(false)} />
      <DeletePanel item={item} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
