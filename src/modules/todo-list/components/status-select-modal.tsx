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
      className="absolute right-[100%] ml-2 bg-white border border-gray-200 rounded shadow-md z-10 p-2 w-40 text-center"
    >
      {status?.map((item) => (
        <button
          className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          onClick={() => onStatusChange(item)}
          key={item}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
