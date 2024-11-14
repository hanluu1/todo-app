import { useTodoStore } from "@/stores";
import { useEffect, useRef } from "react";

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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute right-[100%] bg-white ml-2 border border-gray-200 rounded shadow-md p-1 w-full justify-center"
    >
      {status?.map((item) => (
        <button
          className="block w-full px-4 py-2 text-center text-sm hover:bg-yellow-200 text-black"
          onClick={() => onStatusChange(item)}
          key={item}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
