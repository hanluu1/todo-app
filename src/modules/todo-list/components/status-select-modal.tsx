import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useRef } from 'react';

import { useTodoStore } from '@/stores';

export const StatusSelectModal = ({
  isOpen,
  onStatusChange,
  onClose,
}: {
  isOpen: boolean;
  onStatusChange: (value: string) => void;
  onClose: () => void;
}) => {
  const status = useTodoStore((state) => state.status);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  if (!isOpen) return null;

  return (
    <div className="absolute -bottom-20 origin-top-right">
      <div ref={ref} className="relative text-right">
        <Menu>
          <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
            Choose Status
            <ChevronDownIcon className="size-4 fill-white/60" />
          </MenuButton>
          <MenuItems className="absolute origin-top-right rounded-lg border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
            {status.map((item) => (
              <MenuItem key={item}>
                <button
                  onClick={() => onStatusChange(item)}
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100"
                >
                  {item}
                </button>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};
