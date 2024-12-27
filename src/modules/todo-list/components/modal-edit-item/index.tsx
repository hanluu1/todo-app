import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

import { type Todo } from '@/stores';

import { NewTagForm } from './new-tag-form';
import { TagSelect } from './tag-select';
import { TitleEditSection } from './title-edit-section';

export const ModalEditItem = ({ data, isOpen, onClose }: { data: Todo; isOpen: boolean; onClose: () => void }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 flex w-screen flex-col items-center justify-center overflow-y-auto"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <DialogPanel
        transition
        className="relative overflow-hidden rounded-lg bg-white p-4 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
      >
        <TitleEditSection data={data} onClose={onClose} />
        <div className="flex flex-col p-4">
          <div className="flex w-full items-center justify-between">
            <TagSelect data={data} />
            <PlusCircleIcon
              className="size-5 shrink-0 cursor-pointer text-black"
              onClick={() => {
                setShowForm(true);
              }}
            />
            {/* form to create new tag  */}
            {showForm && <NewTagForm onClose={() => setShowForm(false)} />}
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
