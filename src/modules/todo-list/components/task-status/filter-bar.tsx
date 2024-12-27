import clsx from "clsx";

export const FilterBar = ({
  selectedStatus,
  setSelectedStatus,
}: {
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
}) => {
  return (
    <div className="flex flex-row justify-center gap-2">
      <button
        className={clsx(
          "flex max-w-24 justify-center rounded-full p-2 text-sm font-bold",
          selectedStatus === "" ? "bg-amber-50 text-black shadow-lg" : "bg-white text-zinc-600"
        )}
        onClick={() => setSelectedStatus("")}
      >
        To Do
      </button>
      <button
        className={clsx(
          "flex max-w-24 justify-center rounded-full p-2 text-sm font-bold",
          selectedStatus === "In progress" ? "bg-amber-50 text-black shadow-lg" : "bg-white text-zinc-600"
        )}
        onClick={() => setSelectedStatus("In progress")}
      >
        In Progress
      </button>
      <button
        className={clsx(
          "flex max-w-24 justify-center rounded-full p-2 text-sm font-bold",
          selectedStatus === "Completed" ? "bg-amber-50 text-black shadow-lg" : "bg-white text-zinc-600"
        )}
        onClick={() => setSelectedStatus("Completed")}
      >
        Completed
      </button>
      <button
        className={clsx(
          "flex max-w-24 justify-center rounded-full p-2 text-sm font-bold",
          selectedStatus === null ? "bg-amber-50 text-black shadow-lg" : "bg-white text-zinc-600"
        )}
        onClick={() => setSelectedStatus(null)}
      >
        All
      </button>
    </div>
  );
};
